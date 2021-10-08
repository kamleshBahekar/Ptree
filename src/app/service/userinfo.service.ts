import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserinfoService {
  apiUrl = environment.apiUrl
  constructor(private https: HttpClient) {}
  addUser(data){
    return this.https.post(this.apiUrl + "user",data);
  }
addAddress(data){
  return this.https.post(this.apiUrl + "address",data); 
}
uploadImage(file){
  const uploadData = new FormData();
  for(var i = 0; i < file.length; i++) {
    uploadData.append('myFile'+i, file[i], file[i].name);        
  }
  return this.https.post(this.apiUrl + "upload",uploadData); 
}
addDocument(data){
  return this.https.post(this.apiUrl + "document",data); 
  
}
getDetail(id){
  return this.https.get(this.apiUrl + 'form/'+id); 
  
}

}
