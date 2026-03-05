# Book Barter - Complete Testing Guide

## 🚀 Quick Start Testing

### Step 1: Start Both Servers

**Terminal 1 - Backend:**
```bash
cd server
node server.js
```
✅ Should see: "Server running on port 5000" and "✅ MongoDB Connected Successfully"

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```
✅ Should open: http://localhost:3000

---

## 📋 Complete Test Checklist

### ✅ Test 1: User Registration
1. Go to http://localhost:3000
2. Click "Register" or navigate to http://localhost:3000/register
3. Fill in:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
4. Click "Register"
5. ✅ Should show success alert and redirect to login

### ✅ Test 2: User Login
1. On login page, enter:
   - Email: `test@example.com`
   - Password: `password123`
2. Click "Login"
3. ✅ Should redirect to Home page
4. ✅ Should see navbar with "Home", "Add Book", "Dashboard", "Logout"

### ✅ Test 3: Add First Book
1. Click "Add Book" in navbar
2. Fill in:
   - Title: `Harry Potter and the Philosopher's Stone`
   - Author: `J.K. Rowling`
   - Genre: `Fantasy`
   - Condition: Select "Good"
   - Image: Upload any book image
3. Click "Add Book"
4. ✅ Should show success alert
5. ✅ Should redirect to Dashboard
6. ✅ Should see your book in "My Books" section

### ✅ Test 4: Add More Books
Repeat Test 3 with these books:
- Title: `The Hobbit`, Author: `J.R.R. Tolkien`, Genre: `Fantasy`
- Title: `1984`, Author: `George Orwell`, Genre: `Dystopian`
- Title: `To Kill a Mockingbird`, Author: `Harper Lee`, Genre: `Classic`

### ✅ Test 5: View All Books (Home Page)
1. Click "Home" in navbar
2. ✅ Should see all books you added
3. ✅ Each book should show:
   - Image
   - Title
   - Author
   - Genre badge
   - Condition badge
   - "View Details" button

### ✅ Test 6: Search Books
1. On Home page, use search box
2. Type: `Harry`
3. ✅ Should filter and show only Harry Potter book
4. Clear search
5. ✅ Should show all books again

### ✅ Test 7: Create Second User (For Trading)
1. Click "Logout"
2. Click "Register"
3. Create second user:
   - Name: `User Two`
   - Email: `user2@example.com`
   - Password: `password123`
4. Login with second user
5. Add 2-3 books for this user

### ✅ Test 8: View Book Details
1. Login as User Two
2. Go to Home page
3. Click "View Details" on any book from User One
4. ✅ Should see:
   - Book image
   - Title, Author, Genre, Condition
   - Owner name
   - "Propose a trade" section

### ✅ Test 9: Propose a Trade
1. Still on book details page (User Two viewing User One's book)
2. In "Propose a trade" section:
   - Select one of your books from dropdown
3. Click "Propose Trade"
4. ✅ Should show success alert
5. ✅ Should redirect to Dashboard

### ✅ Test 10: Check Sent Trades
1. On Dashboard (User Two)
2. Scroll to "Sent Trade Requests" section
3. ✅ Should see your trade request with:
   - Your book offered
   - Book you requested
   - Status: "Pending" (yellow badge)

### ✅ Test 11: Check Incoming Trades
1. Logout
2. Login as User One (`test@example.com`)
3. Go to Dashboard
4. Check "Incoming Trade Requests" section
5. ✅ Should see trade request from User Two with:
   - Book they offered
   - Book they want
   - Status: "Pending"
   - "Accept" and "Reject" buttons

### ✅ Test 12: Accept Trade
1. Still on Dashboard (User One)
2. Click "Accept" on the trade request
3. ✅ Page should reload
4. ✅ Status should change to "Accepted" (green badge)
5. ✅ Accept/Reject buttons should disappear

### ✅ Test 13: Reject Trade (Optional)
1. Create another trade request (User Two → User One)
2. Login as User One
3. Click "Reject" on the new trade
4. ✅ Status should change to "Rejected" (red badge)

### ✅ Test 14: Dashboard Statistics
1. On Dashboard, check top statistics cards:
   - ✅ "My Books" count should be correct
   - ✅ "Incoming Requests" count should be correct
   - ✅ "Sent Requests" count should be correct

### ✅ Test 15: Responsive Design
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test on different screen sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)
4. ✅ Layout should adjust properly
5. ✅ Navbar should collapse on mobile

### ✅ Test 16: Navigation
1. Test all navbar links:
   - Home → Should show all books
   - Add Book → Should show add book form
   - Dashboard → Should show dashboard
   - Logout → Should logout and redirect to login

### ✅ Test 17: Protected Routes
1. Logout
2. Try to access directly:
   - http://localhost:3000/
   - http://localhost:3000/dashboard
   - http://localhost:3000/addbook
3. ✅ Should redirect to login page for all

### ✅ Test 18: Form Validation
1. Try to login with empty fields
2. ✅ Should show browser validation
3. Try to add book without title
4. ✅ Should show validation error

### ✅ Test 19: Image Upload
1. Add book with image
2. ✅ Should show preview before upload
3. After adding, check if image displays correctly
4. ✅ Image should load from server

### ✅ Test 20: Error Handling
1. Stop backend server
2. Try to login
3. ✅ Should show error message
4. Restart backend
5. ✅ Should work again

---

## 🎯 Quick Test Scenario (5 Minutes)

**User 1 (Alice):**
1. Register → Login
2. Add 2 books
3. Logout

**User 2 (Bob):**
1. Register → Login
2. Add 2 books
3. View Alice's book → Propose trade
4. Check Dashboard → See sent request

**User 1 (Alice):**
1. Login
2. Dashboard → See incoming request
3. Accept trade
4. ✅ Trade completed!

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot connect to server"
**Solution:** Make sure backend is running on port 5000

### Issue 2: "MongoDB Connection Error"
**Solution:** Check .env file has correct MONGO_URI

### Issue 3: Images not showing
**Solution:** 
- Check uploads folder exists in server directory
- Check image path in code: `http://localhost:5000/uploads/`

### Issue 4: "Login failed"
**Solution:** 
- Make sure you registered first
- Check email/password are correct
- Check backend console for errors

### Issue 5: Trade not showing
**Solution:**
- Refresh the page
- Check if you're logged in as correct user
- Check backend console for errors

---

## 📊 Test Data Template

### User 1:
- Email: test1@example.com
- Password: password123
- Books: Harry Potter, The Hobbit, 1984

### User 2:
- Email: test2@example.com
- Password: password123
- Books: Pride and Prejudice, The Great Gatsby, Moby Dick

### User 3:
- Email: test3@example.com
- Password: password123
- Books: Brave New World, Animal Farm, Lord of the Flies

---

## ✅ Final Checklist Before Demo

- [ ] Backend server running
- [ ] Frontend server running
- [ ] MongoDB connected
- [ ] At least 2 users created
- [ ] At least 6 books added (3 per user)
- [ ] At least 1 trade completed
- [ ] All pages load without errors
- [ ] Images display correctly
- [ ] Search works
- [ ] Responsive on mobile
- [ ] No console errors

---

## 🎥 Demo Script

1. **Show Login/Register** (30 sec)
   - "Users can register and login securely"

2. **Show Home Page** (30 sec)
   - "Browse all available books"
   - "Search functionality"

3. **Show Add Book** (30 sec)
   - "Users can add their books with details and images"

4. **Show Book Details** (30 sec)
   - "View book information and propose trades"

5. **Show Dashboard** (1 min)
   - "Manage your books"
   - "View incoming and sent trade requests"
   - "Accept or reject trades"

6. **Show Complete Trade Flow** (1 min)
   - User A proposes trade
   - User B accepts
   - Show updated status

**Total Demo Time: 4 minutes**

---

## 📝 Testing Notes

- Test with real book images for better presentation
- Use realistic book titles and authors
- Test on Chrome, Firefox, and Edge
- Clear browser cache if issues occur
- Check browser console for errors (F12)

---

**Good Luck with Testing! 🚀**
