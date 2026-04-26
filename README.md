<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white" alt="MySQL" />
</div>

<h1 align="center">Arvion - B2B SaaS Website & Funnel Builder</h1>

<p align="center">
  <img src="./public/assets/landing.png" alt="Arvion Landing Page" width="100%" />
</p>
<p align="center">
  <img src="./public/assets/dashboard.png" alt="Arvion Agency Dashboard" width="100%" />
</p>

<p align="center">
  A complete, multi-tenant B2B SaaS platform allowing agencies to manage their clients (subaccounts), build highly-customizable sales funnels, manage complex pipelines, and process payments entirely under a white-label brand.
</p>

---

## 🚀 Project Overview

**Arvion** is a comprehensive SaaS solution acting as a website and marketing funnel builder for Agencies. The project is modeled exactly after professional B2B white-labeling tools.

Agencies can:
* Create unlimited customized **Subaccounts** for their business clients.
* Assign custom user permissions and invite team members.
* Build advanced **Funnels** with a drag-and-drop website editor.
* Map custom domains or subdomains to specific funnels dynamically.
* Manage fully functional **Pipelines** with Kanban-style drag-and-drop tickets.
* Monitor analytics through dashboards.
* Accept payments using an integrated **Razorpay** billing portal.

---

## ⚡ Application Circuit Diagram (Architecture Flow)

Below is the complete data flow and system architecture diagram mapping out how the user interacts with the Next.js frontend, Server Actions, Database, and external APIs (Clerk, Razorpay, UploadThing).

```mermaid
graph TD
    %% Define Styles
    classDef default fill:#1e1e1e,stroke:#333,stroke-width:2px,color:#fff;
    classDef user fill:#4F46E5,stroke:#312E81,stroke-width:2px,color:#fff,font-weight:bold;
    classDef auth fill:#E11D48,stroke:#9F1239,stroke-width:2px,color:#fff;
    classDef frontend fill:#0ea5e9,stroke:#0369a1,stroke-width:2px,color:#fff;
    classDef backend fill:#10b981,stroke:#047857,stroke-width:2px,color:#fff;
    classDef db fill:#f59e0b,stroke:#b45309,stroke-width:2px,color:#fff;
    classDef thirdparty fill:#8b5cf6,stroke:#5b21b6,stroke-width:2px,color:#fff;

    %% Nodes
    User((User / Agency Client)):::user
    
    subgraph "Frontend (Next.js 15 App Router)"
        Landing[Public Landing Page]:::frontend
        AuthFlow[Authentication Flow]:::auth
        AgencyDash[Agency Dashboard]:::frontend
        SubDash[Subaccount Dashboard]:::frontend
        Funnel[Drag & Drop Funnel Builder]:::frontend
        Pipeline[Kanban Pipelines]:::frontend
    end

    subgraph "Backend Services"
        ServerActions[Next.js Server Actions]:::backend
        Middleware[Edge Middleware Routing]:::backend
        APIRoutes[API Routes & Webhooks]:::backend
    end

    subgraph "External Providers (Third-Party)"
        Clerk[Clerk Auth System]:::thirdparty
        Razorpay[Razorpay Payment Gateway]:::thirdparty
        UploadThing[UploadThing CDN]:::thirdparty
    end

    subgraph "Database Layer"
        Prisma[Prisma ORM]:::db
        MySQL[(Aiven MySQL Database)]:::db
    end

    %% Flow connections
    User -->|Visits Site| Middleware
    Middleware -->|Checks Domain/Path| Landing
    Landing -->|Sign Up / Login| AuthFlow
    AuthFlow <-->|Validates Identity| Clerk
    AuthFlow -->|Redirects on success| AgencyDash
    
    AgencyDash -->|Manages| SubDash
    SubDash -->|Uses| Funnel
    SubDash -->|Manages| Pipeline
    SubDash -->|Uploads Media| UploadThing

    Funnel -->|Saves Design| ServerActions
    Pipeline -->|Updates Tickets| ServerActions
    AgencyDash -->|Upgrades Subscription| Razorpay

    ServerActions -->|Queries| Prisma
    APIRoutes -->|Queries| Prisma
    Prisma <-->|Reads/Writes| MySQL

    Razorpay -->|Payment Webhooks| APIRoutes
    UploadThing -->|File Upload Callbacks| APIRoutes
```

---

## 🛠️ Technology Stack

| Layer | Technology Used |
| :--- | :--- |
| **Frontend Framework** | Next.js (v15), React (v18) |
| **Styling & UI Components** | Tailwind CSS, Shadcn UI, Tremor, Lucide React, Pangea DnD |
| **Backend & APIs**  | Next.js Server Components, Server Actions, Edge Middleware |
| **Database & ORM** | Aiven MySQL Database, Prisma ORM |
| **Authentication**   | Clerk Authentication |
| **File Storage**   | UploadThing |
| **Payment Gateway**  | Razorpay |
| **Forms & Validation** | React Hook Form, Zod schemas |

---

## 📂 Key Features & Folder Structure

* `src/app/site`: **Public Landing Page** explaining the platform benefits and SaaS pricing cards.
* `src/app/(main)/agency`: **Agency Dashboard** - Central hub for agency owners to manage subaccounts, configure team members, handle global billing, and review total pipeline revenue.
* `src/app/(main)/subaccount`: **Client Interface** - The core workspace for a subaccount instance containing drag-and-drop Kanban pipelines, contact management, media storage, and automations setup.
* `src/app/[domain]`: **Multi-Tenant Routing Engine** - Next.js dynamic routes allowing unlimited custom funnel websites built via the platform to be hosted on dedicated subdomains seamlessly.
* `src/components/forms`: **Robust Form Interactions** - Pre-built forms using Zod schema validation for user invites, pipeline lane management, and agency configuration.
* `src/lib/razorpay`: **Integrated Payment Webhooks** - Endpoints securely capturing Razorpay updates to synchronize SaaS subscription active status instantly with the database.

---

## ⚙️ How It Works Under The Hood

1. **Standard Server Action Data Modification (e.g., Editing Pipeline Lane):**
   - The React application passes validated form data via `React Hook Form` / `Zod` to a Next.js Server Action (`upsertLane`).
   - The Next.js backend receives the typed payload, and performs an authentication check via Clerk.
   - A secure database query is executed via `Prisma` against the MySQL database.
   - Once saved, the server action automatically calls `revalidatePath` to clear the Next.js router cache, directly updating the UI without making separate REST API requests.

2. **Custom Domain Multi-Tenant Routing (e.g., Viewing a Funnel):**
   - A user goes to `client.your-agency.com`.
   - Next.js `middleware.ts` intercepts the request, reads the host header to identify the subdomain (`client`).
   - The middleware dynamically rewrites the incoming path to `src/app/[domain]/[path]/page.tsx`.
   - The `[domain]` server component securely queries the database via Prisma to render the exact custom Funnel page constructed for that particular domain.

---

## 🏁 Getting Started (Local Development)

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites:
* **Node.js** (v18+)
* **MySQL Database** (Local or hosted via Aiven / AWS RDS)
* **Clerk Account** (For Authentication Keys)
* **UploadThing Account** (For File Storage Keys)
* **Razorpay Account** (Optional, for payment sandbox mode)

### Installation Steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/saas-arvion.git
   cd saas-arvion
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Initialize Environment Variables:**
   Create a `.env` file in the root directory and populate it with the necessary keys. Reference `.env.example` if available.

4. **Initialize the Database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

The application will be running on `http://localhost:3000`.

---

<p align="center">
  Developed and managed for <b>Arvion</b>.
  Here is a live demo <b>https://arvian-saas-platform.vercel.app/</b> 
</p>  
<p>Devloped by Ankit</p>
 
