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
4] /category/add/skill
method : get
variables in query : name, desc, session_no, price, pic, duration, extra, user_id, cat_id, schedule (array)
usage : add skill from timeline or sidemenu
return : success message
********************************************
5] /category/add/need
method : get
variables in query : name, desc, pic, cat_id, user_id
usage : add need from timeline or sidemenu
return : success message
********************************************
6] /category/favorite
method : get
variables in query : user_id
usage : in favorite
return : all user favorite skills
********************************************
7] /category/favorite/update
method : get
variables in query : user_id,skill_id
usage : add or remove from favorite
return : status message
********************************************
8] /skill/apply
method : post
variables in body : learner,date,skill,schedule(array)
usage : apply skill
return : status message
********************************************
9] /need/form/add
method : post
variables in body : sessions_no,duration,price,extra,need_id,schedule(array),user
usage : add form with schedules
return : status message
********************************************
10] /need/form/approve
method : post
variables in body : sessions_no,duration,price,extra,need_id,schedule(array)
usage : add form
return : status message
********************************************
11] /notification
method : post
variables in body : user,date
usage : notifications
return : apply skill users & apply form users 
********************************************