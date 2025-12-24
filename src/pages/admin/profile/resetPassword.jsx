import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword, forgotPassword } from "../../../features/user/api/userApi.js";
import { toast } from "react-toastify";

export default function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading } = useSelector((state) => state.user || {});
    const { data: user } = useSelector((state) => state.user || {});

    const [formData, setFormData] = useState({
        email: user?.data?.email || "",
        otp: "",
        newPassword: "",
        cpassword: ""
    });
    const otpSentRef = useRef(false);

    useEffect(() => {
        if (user?.data?.email && !formData.email) {
            setFormData(prev => ({ ...prev, email: user.data.email }));
        }
    }, [user, formData.email]);

    useEffect(() => {
        if (formData.email && !otpSentRef.current) {
            otpSentRef.current = true;
            dispatch(forgotPassword(formData.email))
                .unwrap()
                .then(() => {
                    toast.info("OTP has been sent to your email");
                })
                .catch((err) => {
                    toast.error(err?.message || "Failed to send OTP");
                    // Reset ref if we want to allow retry on next mount or manual trigger
                    // But for automatic sending on mount, it's safer to stay true
                });
        }
    }, [dispatch, formData.email]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.newPassword !== formData.cpassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await dispatch(resetPassword(formData)).unwrap();
            toast.success("Password reset successfully!");
            navigate("/profile");
        } catch (err) {
            toast.error(err?.message || "Failed to reset password");
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100 mt-6">
                <div className="bg-[#49BBBD] p-6 text-white text-center">
                    <h2 className="text-2xl font-bold">Reset Password</h2>
                    <p className="text-white/80 text-sm mt-1">Enter your details to change your password</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-600 ml-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="p-4 border border-gray-200 rounded-2xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#49BBBD]/50 transition-all"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-600 ml-1">OTP</label>
                            <input
                                type="text"
                                name="otp"
                                value={formData.otp}
                                onChange={handleChange}
                                placeholder="Enter the OTP sent to your email"
                                className="p-4 border border-gray-200 rounded-2xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#49BBBD]/50 transition-all"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-600 ml-1">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className="p-4 border border-gray-200 rounded-2xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#49BBBD]/50 transition-all"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-600 ml-1">Confirm Password</label>
                            <input
                                type="password"
                                name="cpassword"
                                value={formData.cpassword}
                                onChange={handleChange}
                                placeholder="Confirm new password"
                                className="p-4 border border-gray-200 rounded-2xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#49BBBD]/50 transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#49BBBD] text-white rounded-2xl p-4 font-bold hover:bg-[#3ca8aa] transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Resetting..." : "Reset Password"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            className="bg-gray-100 text-gray-600 rounded-2xl p-4 font-bold hover:bg-gray-200 transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
