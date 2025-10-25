# NFT Credit Bank 🏦

A revolutionary blockchain-based academic credential management system that tokenizes educational achievements as NFTs on the Solana blockchain. This platform allows students to securely store, manage, and showcase their academic credits while providing administrators with tools to issue and verify credentials.

## 🌟 Features

### For Students
- **Digital Wallet Integration**: Connect with Solana wallets (Phantom, Solflare, etc.)
- **Academic Credit Tracking**: View enrolled courses and earned credits
- **NFT Certificate Generation**: Generate blockchain-verified certificates
- **Real-time Credential Verification**: Check transaction history on Solana Explorer
- **Progress Tracking**: Monitor completion status towards degree requirements

### For Administrators
- **Course Management**: Create and manage academic courses
- **Student Registration**: Add students to the system
- **Credit Issuance**: Issue academic credits as NFTs to students
- **Approval Workflow**: Review and approve credit requests
- **User Management**: Manage student and admin accounts

## 🚀 Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Blockchain Integration
- **Solana Web3.js** - Solana blockchain interaction
- **SPL Token 2022** - Token program for NFT creation
- **Wallet Adapter** - Multi-wallet support
- **Token Metadata** - NFT metadata management

### Backend
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Next.js API Routes** - Serverless API endpoints

### Additional Libraries
- **Axios** - HTTP client
- **html-to-image** - Certificate generation
- **file-saver** - File download functionality

## 📁 Project Structure

```
nftcreditbank/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/             # Admin dashboard
│   │   ├── student/           # Student dashboard
│   │   ├── certificates/      # Certificate generation
│   │   ├── check/             # User verification
│   │   ├── course/[id]/       # Course details
│   │   ├── addCourse/         # Course creation
│   │   ├── addStudent/        # Student registration
│   │   └── api/               # API routes
│   │       ├── admin/         # Admin APIs
│   │       ├── course/       # Course management
│   │       ├── issue/        # Credit issuance
│   │       └── users/        # User management
│   ├── components/            # Reusable React components
│   │   ├── AdminHeader.tsx
│   │   ├── AdminNav.tsx
│   │   ├── Approve.tsx
│   │   ├── Cerificate.tsx
│   │   ├── CourseForm.tsx
│   │   ├── CourseList.tsx
│   │   ├── StudentForm.tsx
│   │   └── Transaction.tsx
│   ├── libs/                  # Utility libraries
│   │   └── mongo.ts          # MongoDB connection
│   └── models/               # Database models
│       ├── course.model.ts
│       ├── issue.model.ts
│       └── user.model.ts
├── public/                   # Static assets
└── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account (or local MongoDB)
- Solana wallet (Phantom, Solflare, etc.)

### Environment Variables
Create a `.env.local` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
NEXT_PUBLIC_SOLANA_NETWORK=devnet
```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nftcreditbank
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your MongoDB URI
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage Guide

### For Students

1. **Connect Wallet**: Click "Connect Wallet" and select your Solana wallet
2. **Verify Identity**: The system will check if your wallet is registered
3. **View Dashboard**: Access your academic dashboard with:
   - Enrolled courses
   - Earned credits
   - Progress towards certificate
4. **Generate Certificate**: Once you reach 164 credits, generate your NFT certificate

### For Administrators

1. **Admin Access**: Connect with an admin-registered wallet
2. **Course Management**: 
   - Add new courses with credit values
   - View all available courses
3. **Student Management**:
   - Register new students
   - Issue credits to students
4. **Approval Workflow**: Review and approve credit requests

## 🔧 API Endpoints

### Course Management
- `GET /api/course` - Fetch all courses
- `POST /api/course` - Create new course
- `GET /api/course/[id]` - Get specific course

### User Management
- `GET /api/users/[walletAddress]` - Get user by wallet address
- `POST /api/admin/student` - Register new student
- `POST /api/admin/course` - Create new course

### Credit Issuance
- `POST /api/issue` - Issue credits to student
- `GET /api/issue` - Get pending credit requests
- `GET /api/issue/[walletAddress]` - Get student's credit history

## 🗄️ Database Schema

### User Model
```typescript
{
  walletAddress: string (unique)
  name: string
  email: string (unique)
  role: "Admin" | "Student"
}
```

### Course Model
```typescript
{
  courseName: string
  courseDescription: string
  credits: number
}
```

### Issue Model
```typescript
{
  walletAddress: string
  name: string
  courseName: string
  email: string
  credits: number
  status: "Not" | "Issue" | "Approved"
}
```

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop and mobile devices
- **Dark Theme**: Modern gradient backgrounds
- **Smooth Animations**: Framer Motion powered transitions
- **Interactive Elements**: Hover effects and loading states
- **Wallet Integration**: Seamless Solana wallet connection

## 🔐 Security Features

- **Wallet-based Authentication**: No passwords required
- **Blockchain Verification**: Immutable credential records
- **Role-based Access**: Separate admin and student interfaces
- **Transaction Transparency**: All operations recorded on blockchain

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- [ ] Multi-chain support (Ethereum, Polygon)
- [ ] Advanced NFT metadata
- [ ] Credit transfer between institutions
- [ ] Mobile app development
- [ ] Integration with learning management systems
- [ ] Advanced analytics and reporting

---

**Built with ❤️ using Next.js, Solana, and MongoDB**