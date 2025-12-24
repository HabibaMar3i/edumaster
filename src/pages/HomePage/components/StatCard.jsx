export default function StatCard({ title, subtitle, button }) {
    return (
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg w-64">
            <h4 className="font-semibold text-gray-700">{title}</h4>
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>

            {button && (
                <button className="mt-3 px-4 py-2 rounded-full bg-pink-500 text-white text-sm">
                    {button}
                </button>
            )}
        </div>
    );
}
