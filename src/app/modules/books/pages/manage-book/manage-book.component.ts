import { Component, OnInit } from '@angular/core';
import { BookRequest } from '../../../../services/models';
import { BookService } from '../../../../services/services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.css']
})
export class ManageBookComponent implements OnInit {
  errorMessage: Array<string> = [];
  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: ''
  };
  selectedBookCover: any;
  selectedPicture: string | undefined;

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    if (bookId) {
      this.bookService.getBooksById({
        'book-id': bookId
      }).subscribe({
        next: (book) => {
         this.bookRequest = {
           id: book.id,
           title: book.title as string,
           authorName: book.authorName as string,
           isbn: book.isbn as string,
           synopsis: book.synopsis as string,
           shareable: book.shareable
         };
         this.selectedPicture='data:image/jpg;base64,' + book.cover;
        }
      });
    }
  }

  saveBook() {
    this.bookService.saveBook({
      body: this.bookRequest
    })
    .pipe(
      switchMap((bookId: number) =>
        this.bookService.uploadCover({
          'book-id': bookId,
          body: {
            file: this.selectedBookCover
          }
        })
      ),
      catchError((err) => {
        console.log(err.error);
        this.errorMessage = err.error.validationErrors as Array<string>;
        return of(null);
      })
    )
    .subscribe(() => this.router.navigateByUrl('/books/my-books'));
  }

  onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];
    console.log(this.selectedBookCover);

    if (this.selectedBookCover) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

}
