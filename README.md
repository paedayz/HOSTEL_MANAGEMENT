## 🏬 HOSTEL MANAGEMENT (Agoden)
https://agoden-paedayz.vercel.app/

## Functional
- [x] List hostel
- [x] Search hostel by name or detail
- [x] View hostel info
- [x] Login by using username and password.
- [x] Register
- [x] Confirm Password
- [x] Booking

## Non-Functional

- [x] Validate the duplicate email when registration
- [x] Show Available Hotel
- [x] Show sidemenu

## Additional Feature
- [x] Create tag when add hostel
- [x] Search hostel by tag
- [x] Show rating average by star in every hostel information
- [x] Show booking icon in booking list page if you are booking that hostel
- [x] Filter hostel by Price rate and Star rate
- [x] Sort hostel Avaliable list by Star, Price and Visiting
- [x] Rate hostel with star when you visiting already
- [x] Cancel booking
- [x] My Hostel List page
- [x] CRUD hostel
- [x] Close hostel if you don't want user to booking your hostel now
- [x] Show now booking list at my hostel page and hostel detail page for your hostel
- [x] Admin Page that can set approve, not approve and delete every hostel
- [x] Logout system

## Constraint
- This website isn't responsive to the moblie devices and some desktop size
- You can only put your Image URL to this website because I have some problem when send form-data to backend then I use image url to create image instead

## Issue
- Location map in hostel detail page not working (it still working on localhost but when I deploy frontend side to server it's not working)


## Backend
deployed on https://hostel-managements.herokuapp.com/

## API Documentation
### Auth route
| Path                               | Method   | Access       | Description                                               | Request Body Data |
| --------------------------------------- |----------|--------------|-----------------------------------------------------------|-------------------|
| `/api/auth/register`            | POST      |    Public     | Register the user | email<br/>password<br/>username<br/>first_name<br/>last_name<br/>date_of_birth|
| `/api/auth/login`            | POST      |    Public     | Log the user in | email_username<br/>password |
| `/api/auth/editProfile`            | POST      |    Private     | Edit own user credentials | email<br/>password<br/>username<br/>first_name<br/>last_name<br/>date_of_birth |

### Hostel route
| Path                               | Method   | Access       | Description                                               | Request Body Data |
| --------------------------------------- |----------|--------------|-----------------------------------------------------------|-------------------|
| `/api/hostel/getAllHostelList`            | GET      |    Public     | Get all hostel list in this website |  |
| `/api/hostel/getAllAvailableHostelList`            | GET      |    Private     | Get hostel list that admin approve and owner open |  |
| `/api/hostel/getHostelDetail/:hostelId`            | GET      |    Private     | Get hostel data by hostel id |  |
| `/api/hostel/addHostel`            | POST      |    Private     | Add new hostel with data | name<br/>price<br/>detail<br/>latitude<br/>longitude |
| `/api/hostel/getOwnerUserHostel`            | GET      |    Private     | Get all hostel data that you are owner |  |
| `/api/hostel/editHostel`            | POST      |    Private     | Edit hostel | <div>_id<div/><br/>detail |
| `/api/hostel/deleteHostel/:hostelId`            | DELETE      |    Private     | Delete hostel by id and you must be owner or admin to delete that hostel |  |
| `/api/hostel/setHostelStatus`            | POST      |    Private     | Owner can set hostel status to Open or Close | <div>_id<div/><br/>status |
| `/api/hostel/adminApproveHostelRequest`            | POST      |    Private     | Approve hostel by user that have admin status | <div>_id<div/><br/>admin_approve |
| `/api/hostel/searchAPI/:search_term`            | GET      |    Private     | Get all of the hostels in database, if hostel name and detail match to search_term it will return that hostel data to hostel list page |  |
| `/api/hostel/rating`            | POST      |    Private     | Rating hostel by star | rating<br/>hostel_id<br/>booking_id<br/>booker |

### Booking route
| Path                               | Method   | Access       | Description                                               | Request Body Data |
| --------------------------------------- |----------|--------------|-----------------------------------------------------------|-------------------|
| `/api/booking/booking`            | POST      |    Private     | User booking hostel that available | booker<br/>hostel_id<br/>check_in<br/>check_out |
| `/api/booking/cancelBooking`            | POST      |    Private     | Cancel booking the hostel that had booking before | bookingId |
| `/api/booking/getBookingList`            | GET      |    Private     | Get hostel booking list that user had booking |  |
