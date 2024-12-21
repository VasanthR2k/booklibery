import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }
  GetBooks() {
    return this.http.get<any>(`http://localhost:3000/books`)
  }
  createBooks(data: any) {
    console.log(data)
    let f = new FormData()
    if (data.uploadpdf && data.download) {

      f.append("title", data.title);
      f.append("author", data.author);
      f.append("description", data.description);
      f.append("release_year", data.release_year);
      f.append("image", data.download);
      f.append("pdf", data.uploadpdf);

      return this.http.post<any>(`http://localhost:3000/books/post`, f)
    }
    else {
      if (data.uploadpdf) {
        f.append("title", data.title);
        f.append("author", data.author);
        f.append("description", data.description);
        f.append("release_year", data.release_year);
        f.append("pdf", data.uploadpdf);

        return this.http.post<any>(`http://localhost:3000/books/post`, f)
      }
      else if (data.download) {
        f.append("title", data.title);
        f.append("author", data.author);
        f.append("description", data.description);
        f.append("release_year", data.release_year);
        f.append("image", data.download);

        return this.http.post<any>(`http://localhost:3000/books/post`, f)
      }
      else {
        return this.http.post<any>(`http://localhost:3000/books/post`, data)
      }


    }
  }
  Deletebooks(data: any) {
    return this.http.delete<any>(`http://localhost:3000/books/delete/${data}`)
  }
  filter(data: any) {
    return this.http.get<any>(`http://localhost:3000/books/filterdata/?queryString=${data}`)
  }
  Update(data: any) {

    let app = new FormData()
    if (data.uploadpdf && data.download) {
      app.append("image", data.download),
        app.append("pdf", data.uploadpdf)

      return this.http.put<any>(`http://localhost:3000/books/update/${data.id}`, app, data)
    } else {
      if (data.uploadpdf) {
        app.append("pdf", data.uploadpdf)
        return this.http.put<any>(`http://localhost:3000/books/update/${data.id}`, app, data)
      }
      else if (data.download) {
        app.append("image", data.download)
        return this.http.put<any>(`http://localhost:3000/books/update/${data.id}`, app)
      }
      else {
        return this.http.put<any>(`http://localhost:3000/books/update/${data.id}`, data)

      }
    }

  }
  findcount() {

    return this.http.get<any>(`http://localhost:3000/books/findbycount`)

  }

  removefile(data: any) {
    
    return this.http.post<any>(`http://localhost:3000/books/removedata`, data)
    
  }

  finddatacheck(data: any) {

   return this.http.post<any>(`http://localhost:3000/Login/datalist`, data)
  

  }

  pastrodata(data:any){
    
    return this.http.post<any>(`http://localhost:3000/pastro/findone`, data)

  }

}
