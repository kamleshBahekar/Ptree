import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserinfoService {
  headers = new HttpHeaders({ 'x-token': sessionStorage.getItem("accessToken") });
  apiUrl = environment.apiUrl
  SharingData = new Subject(); 
  constructor(private https: HttpClient) {}

  addUser(data){
    return this.https.post(this.apiUrl + "user",data, {'headers':this.headers});
  }
addAddress(data){
  return this.https.post(this.apiUrl + "address",data, {'headers':this.headers}); 
}
uploadImage(file){
  const uploadData = new FormData();
  for(var i = 0; i < file.length; i++) {
    uploadData.append('myFile'+i, file[i], file[i].name);        
  }
  return this.https.post(this.apiUrl + "upload",uploadData, {'headers':this.headers}); 
}
addDocument(data){
  return this.https.post(this.apiUrl + "document",data, {'headers':this.headers}); 
}
getDetail(id){
  return this.https.get(this.apiUrl + 'form/'+id, {'headers':this.headers}); 
  
}
getList(page,limit){
  return this.https.get(this.apiUrl + `user/list?page=${page}&limit=${limit}`, {'headers':this.headers}); 
  
}


getUse(id){
  return this.https.get(this.apiUrl + 'user/'+id, {'headers':this.headers}); 
}
deleteUser(id){
  return this.https.delete(this.apiUrl + 'user/delete/'+id, {'headers':this.headers}); 
}
updateUser(id,data){
  return this.https.put(this.apiUrl + 'user/update/'+id,data, {'headers':this.headers}); 
}

getAddress(id){
  return this.https.get(this.apiUrl + 'address/'+id, {'headers':this.headers});  
}

updateAddress(id,data){
  return this.https.put(this.apiUrl + 'address/update/'+id,data, {'headers':this.headers}); 
}
getDocument(id){
  return this.https.get(this.apiUrl + 'document/'+id, {'headers':this.headers});
}
  updateDocument(id,data){
    return this.https.put(this.apiUrl + 'document/update/'+id,data, {'headers':this.headers})
  }


  login(data){
    return this.https.post(this.apiUrl + "auth/login",data).pipe(map((res :any) => {
      console.log("res.data.token",res.data.token)
      if(res.data.token){
        sessionStorage.setItem('accessToken', res.data.token);
      }
      return res
    }));
  }


  register(data){
    return this.https.post(this.apiUrl + "auth/register",data).pipe(map((res :any) => {
      console.log("res.data.token",res.data.token)
      if(res.data.token){
        sessionStorage.setItem('accessToken', res.data.token);
      }
      return res
    }));
  }
}