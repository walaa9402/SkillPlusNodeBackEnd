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
method : post
variables in body : id(of category),user (user id)
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
method : post
variables in body : skill_name, skill_desc, session_no, skill_price, photo_path, duration, extra_fees, user_id, cat_id, schedule (array)
usage : add skill from timeline or sidemenu
return : success message
********************************************
5] /category/add/need
method : post
variables in body : need_name, need_desc, need_photo, cat_id, user_id
usage : add need from timeline or sidemenu
return : success message
********************************************
6] /category/favorite
method : post
variables in body : user_id
usage : in favorite
return : all user favorite skills
********************************************
7] /category/favorite/update
method : post
variables in body : user_id,skill_id
usage : add or remove from favorite
return : status message
********************************************

********************************************
/******** skill/need APIs ********/
----------------------------------------
1] /skill/apply
method : post
variables in body : learner,date,skill,schedule(array)
usage : apply skill
return : status message
********************************************
2] /need/form/add
method : post
variables in body : sessions_no,duration,price,extra,need_id,schedule(array),user
usage : add form with schedules
return : status message
********************************************
3] /need/form/approve
method : post
variables in body : sessions_no,duration,price,extra,need_id,schedule(array)
usage : add form
return : status message
********************************************
4] /notification
method : post
variables in body : user,date
usage : notifications
return : apply skill users & apply form users 
********************************************
5] /skill/mine
method : post
variables in body : id
usage : my skills in side menu
return : all user skills with every skill schedule
********************************************
6] /skill/learners
method : post
variables in body : id
usage : skill details
return : all learners details of this skill
********************************************
7] /need/mine
method : post
variables in body : id
usage : my needs in side menu
return : all user needs 
********************************************
8] /need/forms
method : post
variables in body : id
usage : my needs in side menu
return : all need forms and their users data
********************************************
9] /skill/current
method : post
variables in body : id(user id)
usage : current skills
return : all skills that user applied on them with his on number of sessions
********************************************
10] /need/current
method : post
variables in body : id(user id)
usage : current needs
return : all needs that user applied on them with his schedules
********************************************
11] /need/current/details
method : post
variables in body : id(form id)
usage : current needs details
return : all form details with its schedules
********************************************
12] /skill/sessionend
method : post
variables in body : id,date
usage : after session of skill ends
return : true if last session false if still have sessions
********************************************
13] /skill/rate
method : post
variables in body : id(skill id),rate
usage : skill rate
return : status message
********************************************