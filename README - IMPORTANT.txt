Run "npm install" before continue!

database rules

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /recipes/{recipe} {
      allow read: if true
      allow update, delete: isLoggedIn();
    }
  }
}

function isLoggedIn(){
	return request.auth != null;
}