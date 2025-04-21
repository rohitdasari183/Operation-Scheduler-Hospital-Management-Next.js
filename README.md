# 🏥 Operation Scheduler For Hospital Management

A modern web-based solution to efficiently manage and monitor Operation Theater (OT) schedules in a hospital environment. This project addresses the challenges of dynamic surgical scheduling, resource tracking, and operational transparency using a robust tech stack.

---

## 📌 Project Overview

Hospital OT scheduling can be highly dynamic due to:
- Emergency surgeries
- Delays/postponements
- OT room/doctor availability
- Resource and staff allocation

This system allows:
- Real-time OT scheduling and rescheduling
- Admin dashboard for monitoring OT usage and staff efficiency
- Authentication-based access for admins and users
- Pre/post-op report tracking and analytics

---

## ⚙️ Technologies Used

| Tech         | Description                         |
|--------------|-------------------------------------|
| Next.js      | React framework for frontend & SSR  |
| Tailwind CSS | Utility-first responsive UI design  |
| Firebase     | Backend-as-a-Service: Auth, Firestore, Hosting |
| Recharts     | Charts and data visualization       |
| JWT/OAuth    | Secure authentication mechanism     |

---

## 📁 Folder Structure

├── components/ │ ├── Navbar.jsx │ ├── Footer.jsx │ ├── Sidebar.jsx │ ├── ScheduleCard.jsx │ ├── SurgeryForm.jsx │ ├── UserCard.jsx ├── dashboard/ │ ├── layout.jsx │ ├── page.jsx │ ├── analytics/ │ ├── doctors/ │ ├── ot_schedule/ │ ├── patients/ │ ├── reports/ ├── hooks/ │ └── useAuth.js ├── lib/ │ ├── auth.js │ ├── logger.js │ ├── helpers.js ├── types/ │ ├── index.js │ └── surgery.js ├── public/ │ └── logo.png

How to create ?   
   npx create-next-app@latest operation-scheduler
How to run ?
   cd operation-scheduler
   npm run dev 

.env.local file :

NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAG8v2OywpQLOL9NMMiEiJFYJ6TnnD8xZg
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=operationscheduler-3831e.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=operationscheduler-3831e
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=operationscheduler-3831e.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1059931978624
NEXT_PUBLIC_FIREBASE_APP_ID=1:1059931978624:web:1269d997b943f09e2adf65
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-NZ78CE8BLB
GMAIL_USER=rohitdasari1843@gmail.com
GMAIL_PASS=rmvr vszn dilb jyqk

---

## 🧪 Features

- 🔐 Secure login/logout system with Firebase Auth (JWT & OAuth)
- 🏥 Create, update, cancel surgeries dynamically
- 📊 Admin dashboard with real-time analytics
- 🧾 Attach surgical reports (charts, PDFs, remarks)
- 👩‍⚕️ Manage doctors, nurses, patients
- 📝 Logging system for every user/admin action
- 📆 View past & upcoming OT schedules
- 💊 Track drugs, instruments, and special material usage


