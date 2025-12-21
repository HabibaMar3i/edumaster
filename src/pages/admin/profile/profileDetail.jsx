import {useEffect} from "react";
import {getProfile} from "../../../features/user/api/userApi.js";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";

export default function ProfileDetail() {
    const dispatch = useDispatch();
    const {data: user} = useSelector((state) => state.user || {});
    useEffect(() => {

        dispatch(getProfile());


    }, [dispatch]);

    if (!user) {
        return <div className="p-10 text-center">Loading profile...</div>;
    }
    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="bg-white shadow-lg rounded-3xl overflow-hidden border border-gray-100 mt-6">
                <div className="bg-[#49BBBD] p-8 text-white flex flex-col items-center gap-4">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold backdrop-blur-sm border-2 border-white/30">
                        {user.data.fullName?.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">{user.data.fullName}</h1>
                        <p className="opacity-90 font-medium mt-1">{user.data.role.toUpperCase()}</p>
                    </div>
                </div>

                <div className="p-8 grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Email Address</span>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <span className="text-gray-700 font-medium">{user.data.email}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Phone Number</span>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <span className="text-gray-700 font-medium">{user.data.phoneNumber}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Account Role</span>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <span className="text-gray-700 font-medium">{user.data.role}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Member Since</span>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <span className="text-gray-700 font-medium">
                                    {new Date(user.data.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-gray-50 border-t border-gray-100 flex flex-wrap justify-center gap-4">
                    <Link 
                        to={`/profile/editUser/${user.data._id}`} 
                        className="flex-1 min-w-[200px] bg-[#49BBBD] hover:bg-[#3ca8aa] text-center text-white font-bold rounded-2xl py-4 transition-all shadow-md hover:shadow-lg active:scale-95"
                    >
                        Edit Profile
                    </Link>
                    <Link 
                        to={`/profile/resetPassword`} 
                        className="flex-1 min-w-[200px] bg-white hover:bg-gray-50 text-warning border-2 border-warning/20 font-bold rounded-2xl py-4 transition-all text-center active:scale-95"
                    >
                        Reset Password
                    </Link>
                    <button className="flex-1 min-w-[200px] bg-white hover:bg-red-50 text-danger border-2 border-danger/20 font-bold rounded-2xl py-4 transition-all active:scale-95">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}