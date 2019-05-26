/******** user APIs ********/
----------------------------------------
1] /users/signup
method : post
variables in body : name, email, password, pic
usage : in sign up
return : user info includes his both rating 
********************************************
2] /users/login
method : post
variables in body : email, password
usage : in log in
return : user info includes his both rating 
********************************************
3] /users/all
method : get
variables in body : none
usage : for testing
return : all users
********************************************

********************************************
/******** category APIs ********/
----------------------------------------
1] /category/all
method : get
variables in body : none
usage : for home screen
return : all categories with its info
********************************************
2] /category
method : get
variables in query : id
usage : for specific category
return : all skills and need for this category
********************************************
3] /category/name
method : get
variables in query : none
usage : for dropdown in adding skill or need from sidemenu
return : all skills and need for this category
********************************************
3] /category/add/skill
method : get
variables in query : name, desc, session_no, price, duration, extra, user_id, cat_id, schedule (array)
usage : add skill from timeline or sidemenu
return : success message
********************************************