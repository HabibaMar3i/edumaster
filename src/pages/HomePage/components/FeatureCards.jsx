import { Calendar, Paperclip, User } from "lucide-react";

const features = [
    {
        title: "Online Billing, Invoicing, & Contracts",
        desc: "Simple and secure control of your organization’s financial and legal transactions. Send customized invoices and contracts",
        color: "bg-indigo-500",
        icon: <Paperclip />
    },
    {
        title: "Easy Scheduling & Attendance Tracking",
        desc: "Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance",
        color: "bg-teal-400",
        icon: <Calendar />

    },
    {
        title: "Customer Tracking",
        desc: "Automate and track emails to individuals or groups. Built-in system helps organize your organization",
        color: "bg-sky-400",
        icon: <User />

    },
];

export default function FeatureCards() {
    return (
        <section className="bg-white py-24">
            {/* Heading */}
            <div className="text-center mb-16 px-4">
                <h2 className="text-4xl font-bold text-black">
                    All-In-One <span className="text-teal-400">Cloud Software.</span>
                </h2>
                <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                    TOTC is one powerful online software suite that combines all the tools
                    needed to run a successful school or office.
                </p>
            </div>

            {/* Cards */}
            <div className="grid gap-10 px-6 md:px-20 md:grid-cols-3">
                {features.map((item, i) => (
                    <div
                        key={i}
                        className="relative bg-white rounded-2xl shadow-xl px-8 pt-16 pb-10 text-center"
                    >
                        {/* Icon */}
                        <div
                            className={`absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center text-white ${item.color}`}
                        >
                            {item.icon}
                        </div>

                        <h3 className="text-xl font-semibold text-indigo-900 mb-4">
                            {item.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
