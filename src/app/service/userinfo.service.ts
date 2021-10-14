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
getList(page,limit){
  return this.https.get(this.apiUrl + `user/list?page=${page}&limit=${limit}`); 
  
}


getUse(id){
  return this.https.get(this.apiUrl + 'user/'+id); 
}
deleteUser(id){
  return this.https.delete(this.apiUrl + 'user/delete/'+id); 
}
updateUser(id,data){
  return this.https.put(this.apiUrl + 'user/update/'+id,data); 
}

getAddress(id){
  return this.https.get(this.apiUrl + 'address/'+id);  
}

updateAddress(id,data){
  return this.https.put(this.apiUrl + 'address/update/'+id,data); 
}
getDocument(id){
  return this.https.get(this.apiUrl + 'document/'+id);
}
  updateDocument(id,data){
    return this.https.put(this.apiUrl + 'document/update/'+id,data)
  }
}
