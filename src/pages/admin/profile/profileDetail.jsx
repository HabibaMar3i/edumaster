import {useEffect} from "react";
import {getProfile} from "../../../features/user/api/userApi.js";
import {useDispatch, useSelector} from "react-redux";

export default function ProfileDetail() {
    const dispatch = useDispatch();
    const {data: user} = useSelector((state) => state.user || {});
    useEffect(() => {

        dispatch(getProfile());
    }, [dispatch]);

    if (!user) {
        return <div className="p-10 text-center">Loading profile...</div>;
    }
    console.log(user);
    return (
        <div className="container flex flex-col justify-center items-center gap-7 mt-4 mx-auto p-3 ">


            <div
                className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default w-full">
                <table className="w-full text-sm text-left rtl:text-right text-body">

                    <tbody>
                    <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                        <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap text-center">
                            Full Name
                        </th>
                        <td className="px-6 py-4 text-center">
                            <div className="bg-[#49BBBD] text-white rounded-2xl p-5">{user.data.fullName}</div>
                        </td>


                    </tr>
                    <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                        <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap text-center">
                            Email
                        </th>
                        <td className="px-6 py-4 text-center">
                            <div className="bg-[#49BBBD] text-white rounded-2xl p-5">{user.data.email}</div>

                        </td>


                    </tr>
                    <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                        <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap text-center">
                            Phone Number
                        </th>
                        <td className="px-6 py-4 text-center">
                            <div className="bg-[#49BBBD] text-white rounded-2xl p-5">{user.data.phoneNumber}</div>
                        </td>

                    </tr>
                    <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                        <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap text-center">
                            Role
                        </th>
                        <td className="px-6 py-4 text-center">
                            <div className="bg-[#49BBBD] text-white rounded-2xl p-5">{user.data.role}</div>
                        </td>


                    </tr>
                    <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                        <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap text-center">
                            CreatedAt
                        </th>
                        <td className="px-6 py-4 text-center">
                            <div className="bg-[#49BBBD] text-white rounded-2xl p-5">{user.data.createdAt}</div>
                        </td>


                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="bg-[#49BBBD] text-white rounded-2xl p-5">edit</div>
            <div className="bg-warning text-white rounded-2xl p-5">reset Password</div>
            <div className="bg-danger text-white rounded-2xl p-5">Delete acount</div>

        </div>
    );
}