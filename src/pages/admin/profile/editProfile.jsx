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
        <div className="container flex flex-col justify-center items-center gap-7 mt-4 mx-auto p-3">
            <h2 className="text-2xl font-bold text-heading">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-neutral-primary-soft shadow-xs rounded-base border border-default p-6 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="font-medium text-heading">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="p-3 border border-default rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-[#49BBBD]"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-medium text-heading">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-3 border border-default rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-[#49BBBD]"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-medium text-heading">Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="p-3 border border-default rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-[#49BBBD]"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-medium text-heading">Class Level</label>
                    <input
                        type="text"
                        name="classLevel"
                        value={formData.classLevel}
                        onChange={handleChange}
                        className="p-3 border border-default rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-[#49BBBD]"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#49BBBD] text-white rounded-2xl p-4 mt-4 font-bold hover:bg-[#3ca8aa] transition-colors disabled:opacity-50"
                >
                    {isLoading ? "Updating..." : "Save Changes"}
                </button>
                <button
                    type="button"
                    onClick={() => navigate("/profile")}
                    className="bg-neutral-secondary text-heading rounded-2xl p-4 font-bold hover:bg-neutral-secondary-soft transition-colors"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}