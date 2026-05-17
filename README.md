# 🌟 PQM - Power Quality Management System

A comprehensive web application for monitoring, managing, and analyzing energy systems including solar, wind, and other renewable energy sources.

---

## 📋 Table of Contents

1. [Tech Stack](#-tech-stack)
2. [Project Structure](#-project-structure)
3. [Getting Started](#-getting-started)
4. [Architecture](#-architecture)
5. [Features Overview](#-features-overview)
6. [Component Library](#-component-library)
7. [State Management](#-state-management)
8. [API Integration](#-api-integration)
9. [Routing & Navigation](#-routing--navigation)
10. [Internationalization (i18n)](#-internationalization-i18n)
11. [Forms & Validation](#-forms--validation)
12. [Testing](#-testing)
13. [Styling](#-styling)
14. [Best Practices](#-best-practices)
15. [Common Tasks](#-common-tasks)

---

## 🛠 Tech Stack

### Core

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **SCSS/Sass** - Styling

### State Management

- **Redux Toolkit** - Global state management
- **Redux Persist** - State persistence with encryption
- **TanStack Query (React Query)** - Server state management & caching

### Routing

- **React Router DOM v7** - Client-side routing

### Forms & Validation

- **React Hook Form** - Form state management
- **Yup** - Schema validation

### Data Visualization

- **ApexCharts** - Charts and graphs
- **ECharts** - Advanced charts
- **React Leaflet** - Interactive maps
- **React Simple Maps** - Geographic maps

### UI Libraries

- **@tanstack/react-table** - Data tables
- **@tanstack/react-virtual** - Virtualization
- **@dnd-kit** - Drag and drop
- **React Multi Date Picker** - Date/time selection
- **React Toastify** - Notifications
- **Lucide React** - Icons

### Testing

- **Vitest** - Unit test runner
- **React Testing Library** - Component testing
- **jsdom** - DOM environment

### Backend/File Handling

- **Axios** - HTTP client
- **Express** - File upload server
- **Multer** - File upload handling
- **XLSX** - Excel file handling

---

## 📁 Project Structure

```
Swem-Front/
├── public/                          # Static assets
│   ├── images/                      # Public images
│   ├── json/                        # GeoJSON files for maps
│   └── uploads/                     # User uploaded files
│
├── src/
│   ├── app.tsx                      # Main app component
│   ├── main.tsx                     # Application entry point
│   ├── index.scss                   # Global styles
│   │
│   ├── assets/                      # Static assets
│   │   ├── fonts/                   # Font files
│   │   ├── icons/                   # SVG icon components (159 icons)
│   │   ├── images/                  # Images
│   │   ├── json/                    # JSON data files
│   │   └── styles/                  # Global SCSS files
│   │
│   ├── components/                  # Reusable components
│   │   ├── layouts/                 # Layout components (Header, Sidebar, etc.)
│   │   ├── pages/                   # Page-specific components (458 files)
│   │   └── ui/                      # UI components library (187 files)
│   │
│   ├── pages/                       # Route pages (80 pages)
│   │   ├── login/                   # Authentication
│   │   ├── organization-trace/      # Monitoring & measurement
│   │   ├── reports/                 # 20 different report pages
│   │   ├── inventory-management/    # Inventory system
│   │   ├── bys/                     # Maintenance & repair
│   │   ├── definitions/             # System definitions
│   │   ├── system-administration/   # Admin panel
│   │   ├── software-versions/       # Version management
│   │   ├── 404/                     # Not found page
│   │   └── error/                   # Error page
│   │
│   ├── routes/                      # Route definitions
│   │   ├── index.tsx                # Main router configuration
│   │   ├── auth-routes.tsx          # Authentication routes
│   │   ├── report-routes.tsx        # Report module routes
│   │   ├── definition-routes.tsx    # Definition module routes
│   │   └── ...                      # Other route modules
│   │
│   ├── services/                    # API service layer (79 files)
│   │   ├── general/                 # General APIs
│   │   ├── login/                   # Authentication APIs
│   │   ├── organization-trace/      # Monitoring APIs
│   │   ├── reports/                 # Report APIs
│   │   ├── definitions/             # Definition APIs
│   │   ├── inventory-management/    # Inventory APIs
│   │   ├── bys/                     # Maintenance APIs
│   │   └── system-administration/   # Admin APIs
│   │
│   ├── store/                       # Redux store
│   │   ├── store.ts                 # Store configuration
│   │   └── features/                # Redux slices
│   │       ├── tree-slice.ts        # Organization tree state
│   │       ├── date-filter-slice.ts # Date filter state
│   │       ├── definitions-slice.ts # Definitions state
│   │       └── tree-filter-slice.ts # Tree filter state
│   │
│   ├── types/                       # TypeScript type definitions (44 files)
│   │   ├── api/                     # API response types
│   │   ├── components/              # Component prop types
│   │   ├── forms/                   # Form types
│   │   └── ...                      # Other types
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useDebounce.ts           # Debounce hook
│   │   ├── useClickOutside.ts       # Click outside detection
│   │   ├── useFileUploader.ts       # File upload hook
│   │   ├── useScroll.ts             # Scroll detection
│   │   └── ...                      # Other hooks
│   │
│   ├── helpers/                     # Utility functions
│   │   ├── format-date-for-input.ts # Date formatting
│   │   ├── format-number-with-commas.ts # Number formatting
│   │   ├── get-translated-value.ts  # Translation helper
│   │   ├── handle-error.ts          # Error handling
│   │   ├── cookies.ts               # Cookie management
│   │   └── ...                      # Other helpers
│   │
│   ├── validations/                 # Yup validation schemas (47 files)
│   │   ├── login-schema.ts
│   │   ├── user-schema.ts
│   │   └── ...
│   │
│   ├── enum-data/                   # Enums and constants
│   │   ├── nav-items.ts             # Navigation configuration
│   │   ├── constants.ts             # App constants
│   │   └── ...                      # Feature-specific enums
│   │
│   ├── providers/                   # Context providers
│   │   ├── redux-store-provider.tsx # Redux provider
│   │   └── organization-trace/      # Feature providers
│   │
│   ├── lib/                         # Library configurations
│   │   ├── react-query.ts           # React Query setup
│   │   └── api-method/              # API utilities
│   │
│   ├── test/                        # Test utilities
│   │   ├── setup.ts                 # Test setup
│   │   └── utils.tsx                # Test helpers
│   │
│   └── i18n.ts                      # i18n configuration
│
├── server/                          # File upload server
│   └── server.js                    # Express server for file uploads
│
├── package.json                     # Dependencies
├── vite.config.ts                   # Vite configuration
├── vitest.config.ts                 # Vitest configuration
├── tsconfig.json                    # TypeScript configuration
├── eslint.config.js                 # ESLint configuration
├── permissions.json                 # Permission definitions
├── MAP-README.md                    # Map component documentation
├── TABLE-README.md                  # Table component documentation
└── TESTING-README.md                # Testing guide
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **pnpm** >= 10.8.0 (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Swem-Front

# Install dependencies
pnpm install

# Set up environment variables
# Create .env file with required variables:
# VITE_API_BASE_URL=<your-api-url>
# VITE_REDUX_SECRET_KEY=<your-secret-key>
# VITE_MIMIC_ADDRESS=<mimic-diagram-url>
```

### Running the Application

```bash
# Development mode (runs Vite + file upload server)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run only file upload server
pnpm upload-server

# Run tests
pnpm test

# Run tests once
pnpm test:run

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm coverage

# Lint code
pnpm lint

# Format code
pnpm format
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://your-api-url.com

# Redux Encryption Key
VITE_REDUX_SECRET_KEY=your-secret-key-here

# SCADA Mimic Diagram URL
VITE_MIMIC_ADDRESS=http://mimic-diagram-url.com

# Other optional variables
VITE_UPLOAD_SERVER_PORT=3001
```

---

## 🏗 Architecture

### Application Flow

```
User
  ↓
main.tsx (Entry Point)
  ↓
App Component (app.tsx)
  ↓
├── Fetch Application Localization (i18n)
├── Fetch Application Configuration (Permissions)
├── Set Document Direction (RTL/LTR)
└── Render Router
      ↓
Routes (src/routes/)
  ↓
├── Check Authentication (Cookie: auth_token)
├── Check Permissions (localStorage: application-configuration)
└── Render Page Component
      ↓
Page Component (src/pages/)
  ↓
├── Fetch Data (React Query)
├── Manage State (Redux/Local State)
├── Render UI Components (src/components/ui/)
└── Handle User Interactions
```

### Key Design Patterns

1. **Feature-Based Organization**: Code organized by features (BYS, Reports, Definitions, etc.)
2. **Container/Presentation Pattern**: Separation of logic and UI
3. **Custom Hooks**: Reusable logic extracted into hooks
4. **Service Layer**: All API calls abstracted into service files
5. **Type Safety**: Comprehensive TypeScript types
6. **Component Composition**: Small, reusable components
7. **State Normalization**: Redux for global state, React Query for server state

---

## 🎯 Features Overview

### 1. **Organization Trace (Monitoring & Measurement)**

- Real-time monitoring dashboard
- Plant summary and details
- Interactive geographic maps
- Trend analysis and graphics
- Alarm management
- Index values tracking
- Inverter data monitoring
- Sensor value monitoring

**Key Files:**

- Pages: `src/pages/organization-trace/`
- Components: `src/components/pages/organization-trace/`
- Services: `src/services/organization-trace/`

### 2. **SCADA (Supervisory Control and Data Acquisition)**

- Mimic diagram viewer
- Mimic diagram editor
- Real-time data visualization

**Key Files:**

- Configuration: `src/enum-data/nav-items.ts` (line 74-96)

### 3. **Reports (20+ Report Types)**

- Periodic production/consumption reports
- Inverter reports (index, instant values)
- Sensor value reports
- Weather reports
- System alarm reports
- Tag reports
- Energy consumption reports
- Demand data reports
- Harmonic reports
- Min/Max value reports
- Archive data reports
- Device status reports
- Consumption comparison
- Carbon emissions reports
- Energy index reports
- Scheduled reports

**Key Files:**

- Pages: `src/pages/reports/` (20 pages)
- Components: `src/components/pages/reports/`
- Services: `src/services/reports/`

### 4. **Inventory Management**

- Warehouse management
- Product management
- Stock tracking
- Inventory transfers
- Product images and documentation

**Key Files:**

- Pages: `src/pages/inventory-management/`
- Services: `src/services/inventory-management/`

### 5. **BYS (Maintenance & Repair)**

- Asset tree management
- Plant management
- Work notifications
- Work orders
- Maintenance scheduling

**Key Files:**

- Pages: `src/pages/bys/`
- Services: `src/services/bys/`

### 6. **Definitions**

- Organization management
- Device management
- Device models
- Device model Modbus tables
- Access points
- Weather data locations
- Alarm configurations
- Multi-conditional statuses (MCS)

**Key Files:**

- Pages: `src/pages/definitions/`
- Services: `src/services/definitions/`

### 7. **System Administration**

- User management
- Role management (User Permission Profiles)
- User organization profiles
- Security logs
- Audit logs
- Device categories
- Labels
- Formulas
- Time periods
- Product units/types/manufacturers/brands
- Plant images and videos
- Firm configuration
- Device startup data
- Mimic elements and profiles
- Dashboard map configuration

**Key Files:**

- Pages: `src/pages/system-administration/` (20 pages)
- Services: `src/services/system-administration/`

### 8. **Software Versions**

- Version tracking and management

**Key Files:**

- Pages: `src/pages/software-versions/`
- Services: `src/services/software-versions/`

---

## 🧩 Component Library

### UI Components (`src/components/ui/`)

#### 1. **Inputs**

##### Text Input

```tsx
import { Input } from '@/components/ui/input/Input';

<Input
  label="Username"
  placeholder="Enter username"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  error="Error message"
  required
/>;
```

##### Register Input (React Hook Form)

```tsx
import { RegisterInput } from '@/components/ui/input/register-input/register-input';

<RegisterInput
  register={register}
  name="username"
  label="Username"
  errors={errors}
  required
/>;
```

##### Select Input

```tsx
import { SelectInput } from '@/components/ui/input/select-input/select-input';

<SelectInput
  label="Status"
  options={[
    { value: '1', label: 'Active' },
    { value: '2', label: 'Inactive' },
  ]}
  value={selectedValue}
  onChange={setSelectedValue}
/>;
```

##### Multi-Select Input

```tsx
import { MultiSelectInput } from '@/components/ui/input/multi-select-input/multi-select-input';

<MultiSelectInput
  label="Tags"
  options={tagOptions}
  value={selectedTags}
  onChange={setSelectedTags}
/>;
```

##### Date Input

```tsx
import { DateInput } from '@/components/ui/input/date-input/date-input';

<DateInput
  label="Start Date"
  value={startDate}
  onChange={setStartDate}
  format="YYYY/MM/DD"
/>;
```

##### Date Range Input

```tsx
import { DateRangeInput } from '@/components/ui/input/date-input/date-range-input';

<DateRangeInput
  label="Date Range"
  startDate={startDate}
  endDate={endDate}
  onStartDateChange={setStartDate}
  onEndDateChange={setEndDate}
/>;
```

##### Searchable Select

```tsx
import { SearchableSelect } from '@/components/ui/input/searchable-select/searchable-select';

<SearchableSelect
  label="Device"
  options={deviceOptions}
  value={selectedDevice}
  onChange={setSelectedDevice}
  searchable
/>;
```

##### Organization Picker

```tsx
import { OrganizationPicker } from '@/components/ui/input/organization-picker/organization-picker';

<OrganizationPicker
  label="Select Organization"
  value={selectedOrg}
  onChange={setSelectedOrg}
  treeData={organizationTreeData}
/>;
```

##### File Upload

```tsx
import { UploadFile } from '@/components/ui/input/upload-file/upload-file';

<UploadFile
  label="Upload Image"
  accept="image/*"
  maxSize={5} // MB
  onUpload={(file) => console.log(file)}
/>;
```

##### Checkbox

```tsx
import { CheckBox } from '@/components/ui/input/check-box/check-box';

<CheckBox label="Remember me" checked={isChecked} onChange={setIsChecked} />;
```

##### Toggle Button

```tsx
import { ToggleButton } from '@/components/ui/input/toggle-button/toggle-button';

<ToggleButton
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Enable notifications"
/>;
```

##### Textarea

```tsx
import { Textarea } from '@/components/ui/input/textarea/textarea';

<Textarea
  label="Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={5}
/>;
```

#### 2. **Buttons**

```tsx
import { Button } from '@/components/ui/button/button';

// Primary Button
<Button variant="primary" onClick={handleClick}>
  Save
</Button>

// Secondary Button
<Button variant="secondary" onClick={handleClick}>
  Cancel
</Button>

// Danger Button
<Button variant="danger" onClick={handleDelete}>
  Delete
</Button>

// Icon Button
<Button variant="primary" icon={<SaveIcon />}>
  Save
</Button>

// Loading State
<Button variant="primary" loading disabled>
  Saving...
</Button>
```

##### Submit/Cancel Buttons

```tsx
import { SubmitOrCancelButton } from '@/components/ui/button/submit-or-cancel-button';

<SubmitOrCancelButton
  onCancel={handleCancel}
  isSubmitting={isSubmitting}
  submitText="Save"
  cancelText="Cancel"
/>;
```

#### 3. **Tables**

See detailed documentation in `TABLE-README.md`

```tsx
import { Table } from '@/components/ui/table/table';

<Table
  data={tableData}
  columns={columns}
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
  pageSize={pageSize}
  setPageSize={setPageSize}
  totalCount={totalCount}
  isLoading={isLoading}
  sorting={sorting}
  setSorting={setSorting}
/>;
```

**Column Configuration Example:**

```tsx
const columns = [
  {
    header: 'Name',
    accessorKey: 'name',
    filterType: 'text',
    sort: 'Name',
    enableSorting: true,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    filterType: 'select',
    filterOptions: ['Active', 'Inactive'],
    cell: ({ row }) => <StatusIcon status={row.original.active} />,
  },
  {
    header: 'Created Date',
    accessorKey: 'createdDate',
    filterType: 'date',
    sort: 'CreatedDate',
  },
];
```

#### 4. **Cards**

```tsx
import { Card } from '@/components/ui/cards/card';
import { CardWithLoader } from '@/components/ui/cards/card-with-loader';

// Basic Card
<Card title="Statistics" subtitle="Last 30 days">
  <div>Card content</div>
</Card>

// Card with Loading State
<CardWithLoader loading={isLoading}>
  <div>Card content</div>
</CardWithLoader>
```

#### 5. **Modals**

```tsx
import { ModalWrapper } from '@/components/ui/modal-wrapper/modal-wrapper';

<ModalWrapper
  isOpen={isOpen}
  onClose={handleClose}
  title="Edit User"
  size="large" // small, medium, large, xlarge
>
  <div>Modal content</div>
</ModalWrapper>;
```

##### Delete Modal

```tsx
import { DeleteModal } from '@/components/ui/action/delete-modal';

<DeleteModal
  isOpen={isOpen}
  onClose={handleClose}
  onConfirm={handleDelete}
  itemName="User"
  isDeleting={isDeleting}
/>;
```

##### Sure Action Modal

```tsx
import { SureActionModal } from '@/components/ui/action/sure-action-modal';

<SureActionModal
  isOpen={isOpen}
  onClose={handleClose}
  onConfirm={handleAction}
  title="Confirm Action"
  message="Are you sure you want to proceed?"
/>;
```

#### 6. **Drawer**

```tsx
import { Drawer } from '@/components/ui/drawer/drawer';

<Drawer
  isOpen={isOpen}
  onClose={handleClose}
  title="Filters"
  position="right" // left, right
  width="400px"
>
  <div>Drawer content</div>
</Drawer>;
```

#### 7. **Tabs**

```tsx
import { Tabs } from '@/components/ui/tabs/tabs';

<Tabs
  tabs={[
    { id: 'tab1', label: 'Overview', content: <Overview /> },
    { id: 'tab2', label: 'Details', content: <Details /> },
  ]}
  activeTab={activeTab}
  onChange={setActiveTab}
/>;
```

#### 8. **Accordion**

```tsx
import { Accordion } from '@/components/ui/accordion/accordion';

<Accordion
  items={[
    { id: '1', title: 'Section 1', content: <Content1 /> },
    { id: '2', title: 'Section 2', content: <Content2 /> },
  ]}
  defaultOpen={['1']}
/>;
```

#### 9. **Charts**

##### Line Chart

```tsx
import { LineChart } from '@/components/ui/charts/line-chart/line-chart';

<LineChart
  series={[{ name: 'Production', data: [30, 40, 35, 50, 49, 60, 70] }]}
  categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  height={350}
/>;
```

##### Column Chart

```tsx
import { ColumnChart } from '@/components/ui/charts/column-chart/column-chart';

<ColumnChart
  series={[{ name: 'Energy', data: [44, 55, 41, 67, 22, 43] }]}
  categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
/>;
```

##### Donut Chart

```tsx
import { DonutChart } from '@/components/ui/charts/dount-chart';

<DonutChart
  series={[44, 55, 13, 33]}
  labels={['Solar', 'Wind', 'Hydro', 'Other']}
/>;
```

##### Heatmap Chart

```tsx
import { HeatmapChart } from '@/components/ui/charts/heatmap-chart/heatmap-chart';

<HeatmapChart data={heatmapData} height={350} />;
```

#### 10. **Loaders**

```tsx
import { Loader } from '@/components/ui/loader/loader';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';

// Full Page Loader
<Loader />

// Component Loader
<ComponentLoader loading={isLoading}>
  <YourComponent />
</ComponentLoader>
```

#### 11. **Skeleton Loader**

```tsx
import { SkeletonLoader } from '@/components/ui/skeleton/skeleton-loader';

<SkeletonLoader
  count={5}
  height={50}
  variant="rectangular" // rectangular, circular, text
/>;
```

#### 12. **Badges**

```tsx
import { Badge } from '@/components/ui/badge/badge';
import { AlarmLevelBadge } from '@/components/ui/alarm-level-badge/alarm-level-badge';

<Badge variant="success">Active</Badge>
<Badge variant="danger">Inactive</Badge>
<Badge variant="warning">Pending</Badge>

<AlarmLevelBadge level={1} /> // Critical
<AlarmLevelBadge level={2} /> // Warning
<AlarmLevelBadge level={3} /> // Info
```

#### 13. **Status Components**

```tsx
import { StatusIcon } from '@/components/ui/status-icon';
import { StatusTag } from '@/components/ui/status-tag/status-tag';
import { StatusTagCircle } from '@/components/ui/status-tag-circle.tsx/status-tag-circle';

<StatusIcon status={true} /> // Green check or red X

<StatusTag status="active" text="Active" />

<StatusTagCircle status="online" />
```

#### 14. **Progress Bars**

```tsx
import { LineProgress } from '@/components/ui/progress-bar/line-progress';
import { HalfCircleProgress } from '@/components/ui/progress-bar/half-circle-progress';

<LineProgress value={75} max={100} />

<HalfCircleProgress percentage={75} />
```

#### 15. **Toast Notifications**

```tsx
import { toast } from 'react-toastify';

// Success
toast.success('Operation successful!');

// Error
toast.error('Something went wrong!');

// Warning
toast.warning('Please check your input');

// Info
toast.info('New update available');
```

#### 16. **Maps**

See detailed documentation in `MAP-README.md`

```tsx
import { MapContent } from '@/components/ui/map/map-content';

<MapContent
  geoJsonData={provinceData}
  selectedProvince={selectedProvince}
  onProvinceClick={handleProvinceClick}
/>;
```

#### 17. **Breadcrumb**

```tsx
import { BreadCrumb } from '@/components/ui/bread-crumb/bread-crumb';

<BreadCrumb
  items={[
    { label: 'Home', path: '/' },
    { label: 'Reports', path: '/reports' },
    { label: 'Energy Report', path: '/reports/energy' },
  ]}
/>;
```

#### 18. **Empty & Error States**

```tsx
import { EmptyContent } from '@/components/ui/empty-content/empty-content';
import { ErrorContent } from '@/components/ui/error-content/error-content';

<EmptyContent
  title="No Data Found"
  description="Try adjusting your filters"
  icon={<NoDataIcon />}
/>

<ErrorContent
  title="Error Loading Data"
  description="Please try again later"
  onRetry={handleRetry}
/>
```

#### 19. **Tooltip**

```tsx
import { TooltipPortal } from '@/components/ui/tooltip/tooltip-portal';

<TooltipPortal content="This is a tooltip">
  <button>Hover me</button>
</TooltipPortal>;
```

#### 20. **Image Slider**

```tsx
import { ImgSlider } from '@/components/ui/img-slider/img-slider';

<ImgSlider
  images={[
    { src: '/image1.jpg', alt: 'Image 1' },
    { src: '/image2.jpg', alt: 'Image 2' },
  ]}
  autoPlay
  interval={3000}
/>;
```

#### 21. **User Avatar**

```tsx
import { UserAvatar } from '@/components/ui/user-avatar/user-avatar';

<UserAvatar
  name="John Doe"
  imageUrl="/avatar.jpg"
  size="medium" // small, medium, large
/>;
```

#### 22. **Common Container**

```tsx
import { CommonContainerWithHeader } from '@/components/ui/common-container-with-header/common-container-with-header';

<CommonContainerWithHeader
  title="Page Title"
  subtitle="Page description"
  actions={<Button>Action</Button>}
>
  <div>Page content</div>
</CommonContainerWithHeader>;
```

#### 23. **Import Excel**

```tsx
import { ImportExcelModalContent } from '@/components/ui/import-excel/import-excel-modal-content';

<ImportExcelModalContent
  onImport={handleImport}
  templateUrl="/templates/sample.xlsx"
  acceptedColumns={['name', 'email', 'phone']}
/>;
```

---

## 🗄 State Management

### Redux Store

**Location:** `src/store/`

#### Store Configuration

```typescript
// src/store/store.ts
import { persistor, store } from '@/store/store';

// Store slices:
// - tree: Organization tree state
// - dateFilter: Date filter state
// - orgId: Selected organization ID
// - treeFilter: Tree filter state
```

#### Using Redux State

```tsx
import { setSelectedNode } from '@/store/features/tree-slice';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';

function MyComponent() {
  const dispatch = useDispatch();
  const selectedNode = useSelector(
    (state: RootState) => state.tree.selectedNode,
  );

  const handleSelect = (node: any) => {
    dispatch(setSelectedNode(node));
  };

  return <div>{selectedNode?.name}</div>;
}
```

#### Redux Slices

1. **Tree Slice** (`tree-slice.ts`)
   - Organization tree navigation state
   - Selected nodes
   - Expanded nodes

2. **Date Filter Slice** (`date-filter-slice.ts`)
   - Global date range filters
   - Date presets

3. **Definitions Slice** (`definitions-slice.ts`)
   - Selected organization ID
   - Organization-specific settings

4. **Tree Filter Slice** (`tree-filter-slice.ts`)
   - Tree filtering criteria
   - Search terms

### React Query (TanStack Query)

**Location:** `src/lib/react-query.ts`

#### Configuration

```typescript
// Default options:
// - retry: 1
// - refetchOnWindowFocus: false
```

#### Using React Query

```tsx
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUser, fetchUsers } from '@/services/users-api';

function UsersPage() {
  const queryClient = useQueryClient();

  // Fetch data
  const { data, isLoading, error } = useQuery({
    queryKey: ['users', { page: 1 }],
    queryFn: () => fetchUsers({ page: 1 }),
  });

  // Mutate data
  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create user');
    },
  });

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorContent error={error} />}
      {data && <UserTable data={data.items} />}
    </div>
  );
}
```

#### Query Key Patterns

```typescript
// List queries
['users'][('users', { page: 1, pageSize: 10 })][ // All users // Paginated users
  ('users', { organizationId: 123 })
][ // Filtered users
  // Detail queries
  ('user', userId)
][('device', deviceId)][ // Single user // Single device
  // Nested queries
  ('organization', orgId, 'devices')
][('plant', plantId, 'summary')]; // Organization's devices // Plant summary
```

---

## 🌐 API Integration

### Service Layer Structure

All API calls are organized in `src/services/` by feature:

```typescript
// Example: src/services/definitions/devices/devices-api.ts

import { apiDelete, apiGet, apiPost, apiPut } from '@/lib/api-method/api-get';

export interface DeviceListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  organizationId?: string;
}

export interface Device {
  id: string;
  name: string;
  deviceModelId: string;
  organizationId: string;
  active: boolean;
}

// GET list
export const fetchDevices = async (params: DeviceListParams) => {
  return apiGet<{ items: Device[]; totalCount: number }>(
    '/api/devices',
    params,
  );
};

// GET by ID
export const fetchDeviceById = async (id: string) => {
  return apiGet<Device>(`/api/devices/${id}`);
};

// POST create
export const createDevice = async (data: Partial<Device>) => {
  return apiPost<Device>('/api/devices', data);
};

// PUT update
export const updateDevice = async (id: string, data: Partial<Device>) => {
  return apiPut<Device>(`/api/devices/${id}`, data);
};

// DELETE
export const deleteDevice = async (id: string) => {
  return apiDelete(`/api/devices/${id}`);
};
```

### API Method Utilities

**Location:** `src/lib/api-method/`

Available methods:

- `apiGet(url, params?)` - GET request
- `apiPost(url, data?)` - POST request
- `apiPut(url, data?)` - PUT request
- `apiDelete(url)` - DELETE request
- `apiPatch(url, data?)` - PATCH request

### Error Handling

```typescript
import { handleError } from '@/helpers/handle-error';

try {
  const data = await fetchDevices();
  return data;
} catch (error) {
  handleError(error); // Shows toast notification
  throw error;
}
```

### Authentication

Authentication is handled via cookies:

```typescript
import { getCookie, removeCookie, setCookie } from '@/helpers/cookies';

// Check if user is authenticated
const authToken = getCookie('auth_token');

// Set auth token
setCookie('auth_token', token, 86400); // 1 day

// Remove auth token
removeCookie('auth_token');
```

---

## 🛣 Routing & Navigation

### Route Configuration

**Location:** `src/routes/`

Routes are organized by feature:

- `auth-routes.tsx` - Login, logout
- `report-routes.tsx` - All report routes
- `definition-routes.tsx` - Definition module routes
- `bys-routes.tsx` - Maintenance routes
- `inventory-routes.tsx` - Inventory routes
- `organization-trace-routes.tsx` - Monitoring routes
- `system-administration-routes.tsx` - Admin routes
- `software-routes.tsx` - Software version routes
- `error-routes.tsx` - Error pages

### Protected Routes

Routes are automatically protected based on:

1. **Authentication** - User must have `auth_token` cookie
2. **Permissions** - Route must match user's granted policies

```typescript
// src/routes/index.tsx
const routes = [
  {
    path: '/devices',
    element: <DevicesPage />,
    permission: 'WebNet.Devices', // Required permission
  }
];
```

### Navigation Items

**Location:** `src/enum-data/nav-items.ts`

Navigation is configured in `getNavItems()`:

```typescript
export const getNavItems = (resources?: any): NavItem[] => [
  {
    title: getTranslatedValue('Dashboard'),
    Icon: InterfaceSvg,
    route: '/',
    id: 1,
    children: [],
  },
  {
    title: getTranslatedValue('MonitoringMeasurement'),
    Icon: OrgTraceHeaderSvg,
    route: '/organization-trace',
    id: 2,
    children: [
      {
        title: getTranslatedValue('Menu:OrganizationTrace'),
        route: '/organization-trace',
        id: 20,
      },
      // ... more children
    ],
  },
  // ... more items
];
```

### Programmatic Navigation

```tsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/devices');
    // or with state
    navigate('/devices/123', { state: { from: 'dashboard' } });
  };

  return <button onClick={handleClick}>Go to Devices</button>;
}
```

### Getting Route Parameters

```tsx
import { useParams, useSearchParams } from 'react-router-dom';

function DeviceDetailPage() {
  const { id } = useParams(); // URL params /devices/:id
  const [searchParams] = useSearchParams(); // Query params ?tab=details

  const tab = searchParams.get('tab');

  return (
    <div>
      Device ID: {id}, Tab: {tab}
    </div>
  );
}
```

---

## 🌍 Internationalization (i18n)

### Supported Languages

- English (en)
- Turkish (tr)
- Persian/Farsi (fa) - RTL support

### Configuration

**Location:** `src/i18n.ts`

The application loads translations from the backend API and stores them in localStorage.

### Using Translations

```tsx
import { getTranslatedValue } from '@/helpers/get-translated-value';

function MyComponent() {
  // Basic translation
  const title = getTranslatedValue('Dashboard');

  // Translation with namespace
  const user = getTranslatedValue('Users', 'AbpIdentity.texts');

  // With custom resources
  const label = getTranslatedValue('CustomKey', undefined, customResources);

  return <h1>{title}</h1>;
}
```

### Translation Helper

```typescript
/**
 * Get translated value from localStorage
 * @param key - Translation key
 * @param source - Optional namespace (e.g., 'AbpIdentity.texts')
 * @param resources - Optional custom resources object
 */
export const getTranslatedValue = (
  key: string,
  source?: string,
  resources?: any,
): string => {
  // Implementation
};
```

### RTL Support

The application automatically switches to RTL mode for Persian/Farsi:

```typescript
// In app.tsx
if (CultureName === 'fa' || data?.currentCulture?.name === 'fa') {
  document.dir = 'rtl';
} else {
  document.dir = 'ltr';
}
```

RTL-specific styles are in files like:

- `src/components/ui/button/rtl-button.scss`
- `src/components/ui/modal-wrapper/rtl-modal-wrapper.scss`
- `src/components/ui/user-avatar/rtl-user-avatar.scss`

### Changing Language

```typescript
import { setCookie } from '@/helpers/cookies';

const changeLanguage = (language: 'en' | 'tr' | 'fa') => {
  setCookie('CultureName', language, 86400);
  window.location.reload(); // Reload to fetch new translations
};
```

---

## 📝 Forms & Validation

### React Hook Form

The application uses React Hook Form for form management.

#### Basic Form Example

```tsx
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { SubmitOrCancelButton } from '@/components/ui/button/submit-or-cancel-button';
import { RegisterInput } from '@/components/ui/input/register-input/register-input';

// Define validation schema
const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  age: yup.number().positive().integer().required('Age is required'),
});

function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      age: 0,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await createUser(data);
      toast.success('User created');
      reset();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RegisterInput
        register={register}
        name="name"
        label="Name"
        errors={errors}
        required
      />

      <RegisterInput
        register={register}
        name="email"
        label="Email"
        type="email"
        errors={errors}
        required
      />

      <RegisterInput
        register={register}
        name="age"
        label="Age"
        type="number"
        errors={errors}
        required
      />

      <SubmitOrCancelButton
        onCancel={() => reset()}
        isSubmitting={isSubmitting}
      />
    </form>
  );
}
```

### Form with Select Inputs

```tsx
import { Controller, useForm } from 'react-hook-form';
import { SelectInput } from '@/components/ui/input/select-input/select-input';

function DeviceForm() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="deviceModelId"
        control={control}
        render={({ field }) => (
          <SelectInput
            label="Device Model"
            options={deviceModelOptions}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </form>
  );
}
```

### Validation Schemas

**Location:** `src/validations/`

Example validation schema:

```typescript
// src/validations/user-schema.ts
import * as yup from 'yup';

export const userCreateSchema = yup.object({
  userName: yup.string().required('Username is required').min(3).max(50),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6),
  phoneNumber: yup.string().nullable(),
  isActive: yup.boolean().default(true),
  roleNames: yup.array().of(yup.string()).min(1, 'At least one role required'),
});

export const userUpdateSchema = yup.object({
  userName: yup.string().required('Username is required').min(3).max(50),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: yup.string().nullable(),
  isActive: yup.boolean(),
  roleNames: yup.array().of(yup.string()).min(1),
});

export type UserCreateInput = yup.InferType<typeof userCreateSchema>;
export type UserUpdateInput = yup.InferType<typeof userUpdateSchema>;
```

---

## 🧪 Testing

See detailed documentation in `TESTING-README.md`

### Running Tests

```bash
# Watch mode
pnpm test

# Run once
pnpm test:run

# With UI
pnpm test:ui

# With coverage
pnpm coverage
```

### Test Structure

Tests are located in `__tests__` directories next to the components:

```
src/
  components/
    ui/
      button/
        button.tsx
        __tests__/
          button.test.tsx
```

### Writing Tests

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { Button } from '../button';

describe('Button', () => {
  it('should render correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick handler', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when loading', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

## 🎨 Styling

### SCSS Modules

The application uses SCSS modules for component-specific styles:

```scss
// button.scss
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;

  &.primary {
    background-color: #3b82f6;
    color: white;

    &:hover {
      background-color: #2563eb;
    }
  }

  &.secondary {
    background-color: #6b7280;
    color: white;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

```tsx
// button.tsx
import styles from './button.scss';

export const Button = ({ variant = 'primary', disabled, children }) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${disabled ? styles.disabled : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

### Global Styles

**Location:** `src/assets/styles/`

- `app.scss` - Application-wide styles
- `pages.scss` - Page-specific styles
- Other utility styles

### RTL Styles

RTL-specific styles are separated into files prefixed with `rtl-`:

```scss
// rtl-button.scss
[dir='rtl'] {
  .button {
    // RTL-specific styles
  }
}
```

### Responsive Design

Use SCSS mixins for responsive breakpoints:

```scss
// Example breakpoints
$mobile: 640px;
$tablet: 768px;
$desktop: 1024px;
$wide: 1280px;

.container {
  padding: 1rem;

  @media (min-width: $tablet) {
    padding: 2rem;
  }

  @media (min-width: $desktop) {
    padding: 3rem;
  }
}
```

---

## 💡 Best Practices

### 1. **File Naming Conventions**

- **Components**: PascalCase (`UserProfile.tsx`)
- **Utilities/Helpers**: kebab-case (`format-date.ts`)
- **Styles**: kebab-case (`user-profile.scss`)
- **Types**: kebab-case (`user-types.ts`)
- **Tests**: Same as component with `.test.tsx` (`user-profile.test.tsx`)

### 2. **Component Structure**

```tsx
// 1. Imports (grouped)
import React from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '@/services/users-api';
// Internal imports
import { Button } from '@/components/ui/button/button';
// Styles
import styles from './user-list.scss';

// 2. Types/Interfaces
interface UserListProps {
  organizationId?: string;
  onSelect?: (user: User) => void;
}

// 3. Component
export const UserList: React.FC<UserListProps> = ({
  organizationId,
  onSelect,
}) => {
  // Hooks
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ['users', organizationId],
    queryFn: () => fetchUsers({ organizationId }),
  });

  // Event handlers
  const handleUserClick = (user: User) => {
    onSelect?.(user);
  };

  // Render
  if (isLoading) return <Loader />;

  return (
    <div className={styles.container}>
      {data?.items.map((user) => (
        <div key={user.id} onClick={() => handleUserClick(user)}>
          {user.name}
        </div>
      ))}
    </div>
  );
};
```

### 3. **Custom Hooks**

Extract reusable logic into custom hooks:

```typescript
// useUserList.ts
export const useUserList = (organizationId?: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users', organizationId],
    queryFn: () => fetchUsers({ organizationId }),
  });

  const users = data?.items ?? [];

  return { users, isLoading, error, refetch };
};

// Usage
const { users, isLoading, refetch } = useUserList(orgId);
```

### 4. **Error Handling**

Always handle errors gracefully:

```typescript
try {
  const result = await apiCall();
  toast.success('Operation successful');
  return result;
} catch (error) {
  handleError(error); // Shows appropriate error message
  // Don't rethrow unless necessary
}
```

### 5. **Type Safety**

Use TypeScript types for all function parameters and return values:

```typescript
// Bad
const formatDate = (date) => {
  return date.toLocaleDateString();
};

// Good
const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString();
};
```

### 6. **Avoid Prop Drilling**

Use context or Redux for deeply nested state:

```typescript
// Instead of passing props through many levels
<Parent>
  <Child user={user}>
    <GrandChild user={user}>
      <GreatGrandChild user={user} />
    </GrandChild>
  </Child>
</Parent>

// Use Redux or Context
const user = useSelector((state) => state.auth.user);
```

### 7. **Memoization**

Use `useMemo` and `useCallback` for expensive computations:

```tsx
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### 8. **Code Splitting**

Use lazy loading for routes:

```typescript
// routes/helper/lazyImport.ts
export const lazyImport = (importFunc: any) => {
  return lazy(importFunc);
};

// Usage
const DevicesPage = lazyImport(() => import('@/pages/definitions/devices'));
```

### 9. **Accessibility**

- Use semantic HTML elements
- Add proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers

```tsx
<button
  aria-label="Delete user"
  aria-describedby="delete-description"
  onClick={handleDelete}
>
  <DeleteIcon />
</button>
```

### 10. **Performance**

- Use virtualization for long lists (react-virtual, react-window)
- Implement pagination or infinite scroll
- Optimize images (use WebP format)
- Code split large pages
- Use React Query for caching

---

## 🔧 Common Tasks

### 1. **Adding a New Page**

1. Create page component in `src/pages/[module]/`
2. Create page-specific components in `src/components/pages/[module]/`
3. Add route in `src/routes/[module]-routes.tsx`
4. Add navigation item in `src/enum-data/nav-items.ts` (if needed)
5. Add permission in `permissions.json` (if needed)

Example:

```tsx
// 1. src/pages/definitions/sensors.tsx
import { SensorList } from '@/components/pages/definitions/sensors/sensor-list';

export default function SensorsPage() {
  return (
    <div>
      <h1>{getTranslatedValue('Sensors')}</h1>
      <SensorList />
    </div>
  );
}

// 2. src/routes/definition-routes.tsx
import { lazyImport } from './helper/lazyImport';

const SensorsPage = lazyImport(() => import('@/pages/definitions/sensors'));

export const definitionRoutes = [
  // ... other routes
  {
    path: '/definitions/sensors',
    element: <SensorsPage />,
    permission: 'WebNet.Sensors',
  },
];

// 3. src/enum-data/nav-items.ts
{
  title: getTranslatedValue('Sensors'),
  route: '/definitions/sensors',
  permission: 'WebNet.Sensors',
  id: 79,
}
```

### 2. **Creating a New API Service**

1. Create service file in `src/services/[module]/`
2. Define types
3. Implement API methods
4. Export functions

Example:

```typescript
// src/services/definitions/sensors-api.ts
import { apiDelete, apiGet, apiPost, apiPut } from '@/lib/api-method/api-get';

export interface Sensor {
  id: string;
  name: string;
  type: string;
  deviceId: string;
  unit: string;
  active: boolean;
}

export interface SensorListParams {
  page?: number;
  pageSize?: number;
  deviceId?: string;
}

export const fetchSensors = async (params: SensorListParams) => {
  return apiGet<{ items: Sensor[]; totalCount: number }>(
    '/api/sensors',
    params,
  );
};

export const fetchSensorById = async (id: string) => {
  return apiGet<Sensor>(`/api/sensors/${id}`);
};

export const createSensor = async (data: Partial<Sensor>) => {
  return apiPost<Sensor>('/api/sensors', data);
};

export const updateSensor = async (id: string, data: Partial<Sensor>) => {
  return apiPut<Sensor>(`/api/sensors/${id}`, data);
};

export const deleteSensor = async (id: string) => {
  return apiDelete(`/api/sensors/${id}`);
};
```

### 3. **Adding a New UI Component**

1. Create component directory in `src/components/ui/`
2. Create component file and style file
3. Export component
4. Add to component library (optional)

Example:

```tsx
// src/components/ui/rating/rating.tsx
import React from 'react';
import styles from './rating.scss';

interface RatingProps {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  onChange,
  readonly = false,
}) => {
  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  return (
    <div className={styles.rating}>
      {Array.from({ length: max }, (_, i) => i + 1).map((rating) => (
        <button
          key={rating}
          className={`${styles.star} ${rating <= value ? styles.active : ''}`}
          onClick={() => handleClick(rating)}
          disabled={readonly}
        >
          ★
        </button>
      ))}
    </div>
  );
};
```

```scss
// src/components/ui/rating/rating.scss
.rating {
  display: flex;
  gap: 0.25rem;

  .star {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #d1d5db;
    cursor: pointer;
    transition: color 0.2s;

    &:hover:not(:disabled) {
      color: #fbbf24;
    }

    &.active {
      color: #f59e0b;
    }

    &:disabled {
      cursor: default;
    }
  }
}
```

### 4. **Adding a New Redux Slice**

1. Create slice file in `src/store/features/`
2. Add to store configuration
3. Use in components

Example:

```typescript
// src/store/features/theme-slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Add to store.ts
import themeSlice from './features/theme-slice';

interface ThemeState {
  mode: 'light' | 'dark';
  primaryColor: string;
}

const initialState: ThemeState = {
  mode: 'light',
  primaryColor: '#3b82f6',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload;
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload;
    },
  },
});

export const { setThemeMode, setPrimaryColor } = themeSlice.actions;
export default themeSlice.reducer;

const rootReducer = combineReducers({
  // ... other reducers
  theme: themeSlice,
});
```

### 5. **Adding Form Validation**

1. Create validation schema in `src/validations/`
2. Use with React Hook Form

Example:

```typescript
// src/validations/sensor-schema.ts
import { SensorInput, sensorSchema } from '@/validations/sensor-schema';
import { yupResolver } from '@hookform/resolvers/yup';
// Usage
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export const sensorSchema = yup.object({
  name: yup.string().required('Name is required').max(100),
  type: yup.string().required('Type is required'),
  deviceId: yup.string().required('Device is required'),
  unit: yup.string().required('Unit is required'),
  minValue: yup.number().nullable(),
  maxValue: yup.number().nullable(),
  active: yup.boolean().default(true),
});

export type SensorInput = yup.InferType<typeof sensorSchema>;

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<SensorInput>({
  resolver: yupResolver(sensorSchema),
});
```

### 6. **Adding a Custom Hook**

1. Create hook file in `src/hooks/`
2. Export hook
3. Use in components

Example:

```typescript
// src/hooks/useLocalStorage.ts
import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

// Usage
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

### 7. **Handling File Uploads**

```tsx
import { useFileUploader } from '@/hooks/useFileUploader';
import { UploadFile } from '@/components/ui/input/upload-file/upload-file';

function MyComponent() {
  const { uploadFile, isUploading, progress } = useFileUploader();

  const handleUpload = async (file: File) => {
    try {
      const result = await uploadFile(file, '/api/upload/images');
      console.log('Uploaded:', result.url);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <UploadFile
      onUpload={handleUpload}
      loading={isUploading}
      progress={progress}
    />
  );
}
```

### 8. **Working with Permissions**

```typescript
import { getPermission } from '@/helpers/get-permission-helper';

// Check if user has permission
const canEdit = getPermission('WebNet.Devices.Edit');
const canDelete = getPermission('WebNet.Devices.Delete');

// Conditional rendering
{canEdit && <Button onClick={handleEdit}>Edit</Button>}
{canDelete && <Button onClick={handleDelete}>Delete</Button>}
```

### 9. **Using Date Helpers**

```typescript
import { formatDateForInput } from '@/helpers/format-date-for-input';
import { getTodayDate } from '@/helpers/get-today-date';

const today = getTodayDate();
const formattedDate = formatDateForInput(new Date());
```

### 10. **Working with Organization Tree**

```typescript
import { filterOrganizationTree } from '@/helpers/filter-organization-tree';
import { useQuery } from '@tanstack/react-query';
import { fetchOrganizationTree } from '@/services/general/tree-api';

const { data: treeData } = useQuery({
  queryKey: ['organization-tree'],
  queryFn: fetchOrganizationTree,
});

// Filter tree by search term
const filteredTree = filterOrganizationTree(treeData, searchTerm);
```

---

## 📚 Additional Resources

### Documentation Files

- `MAP-README.md` - Map component documentation
- `TABLE-README.md` - Table component documentation
- `TESTING-README.md` - Testing guide
- `permissions.json` - Permission definitions

### External Libraries Documentation

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)
- [ApexCharts](https://apexcharts.com/)
- [React Leaflet](https://react-leaflet.js.org/)
- [Vitest](https://vitest.dev/)

---

## 🤝 Contributing

### Code Style

- Follow the existing code style
- Use ESLint and Prettier
- Write meaningful commit messages
- Add tests for new features
- Update documentation

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/sensor-management

# Make changes and commit
git add .
git commit -m "feat: add sensor management module"

# Push to remote
git push origin feature/sensor-management

# Create pull request
```

### Commit Message Convention

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: code style changes (formatting)
refactor: code refactoring
test: add or update tests
chore: maintenance tasks
```

---

## 📞 Support

For questions or issues:

1. Check existing documentation
2. Search through codebase for similar implementations
3. Contact the development team

---

## Quick Start Checklist for New Developers

- [ ] Clone repository
- [ ] Install dependencies (`pnpm install`)
- [ ] Set up environment variables (`.env`)
- [ ] Run development server (`pnpm dev`)
- [ ] Read this README thoroughly
- [ ] Review project structure
- [ ] Check MAP-README.md, TABLE-README.md, TESTING-README.md
- [ ] Explore UI component library in `src/components/ui/`
- [ ] Review example pages in `src/pages/`
- [ ] Understand routing in `src/routes/`
- [ ] Review API services in `src/services/`
- [ ] Check permissions in `permissions.json`
- [ ] Run tests (`pnpm test`)
- [ ] Start coding! 🚀
# personal-usage-todo-app
