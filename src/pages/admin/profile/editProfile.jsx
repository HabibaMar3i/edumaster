import {useEffect, useState} from "react";
import {getProfile, updateProfile} from "../../../features/user/api/userApi.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import { toast } from "react-toastify";

export default function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {data: user, isLoading} = useSelector((state) => state.user || {});
    const {userId} = useParams();
    
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        classLevel: ""
    });

    useEffect(() => {
        if (!user) {
            dispatch(getProfile());
        } else if (user.data) {
            setFormData({
                fullName: user.data.fullName || "",
                email: user.data.email || "",
                phoneNumber: user.data.phoneNumber || "",
                classLevel: user.data.classLevel || ""
            });
        }
    }, [dispatch, user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(updateProfile({ userData: formData, userId })).unwrap();
            toast.success("Profile updated successfully!");
            navigate("/profile");
        } catch (error) {
            toast.error(error?.message || "Failed to update profile");
        }
    };

    if (isLoading && !user) {
        return <div className="p-10 text-center">Loading profile...</div>;
    }

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100 mt-6">
                <div className="bg-[#49BBBD] p-6 text-white text-center">
                    <h2 className="text-2xl font-bold">Edit Profile</h2>
                    <p className="text-white/80 text-sm mt-1">Update your account information</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-600 ml-1">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="p-4 border border-gray-200 rounded-2xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#49BBBD]/50 transition-all"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-600 ml-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email address"
                                className="p-4 border border-gray-200 rounded-2xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#49BBBD]/50 transition-all"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-600 ml-1">Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Phone number"
                                className="p-4 border border-gray-200 rounded-2xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#49BBBD]/50 transition-all"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-600 ml-1">Class Level</label>
                            <input
                                type="text"
                                name="classLevel"
                                value={formData.classLevel}
                                onChange={handleChange}
                                placeholder="Class Level"
                                className="p-4 border border-gray-200 rounded-2xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#49BBBD]/50 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#49BBBD] text-white rounded-2xl p-4 font-bold hover:bg-[#3ca8aa] transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Saving Changes..." : "Save Changes"}
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