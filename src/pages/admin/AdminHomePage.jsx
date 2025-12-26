export default function AdminHomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 lg:p-8">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-600">
                            Welcome to your administrative control panel
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
