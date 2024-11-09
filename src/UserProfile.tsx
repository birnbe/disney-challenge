import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { User } from "./types";
import { STATEABBREVIATIONS } from "./utils";
import { useUser } from "./contexts/UserContext";
import { format, differenceInYears } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const UserProfile = () => {
  const { user, setUser } = useUser();

  const [formData, setFormData] = useState<User>(user!);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (user !== null) setFormData(user);
  }, [user]);

  if (formData === null) return;

  const signupEnabled =
    !!formData?.firstName &&
    !!formData?.lastName &&
    !!formData?.birthDate &&
    !!formData?.city &&
    !!formData?.state &&
    !!formData?.character &&
    !!formData?.movie &&
    !!formData?.park;

  const submitProfile = () => {
    setUser({ ...formData, lastUpdate: new Date() });
    setIsEditing(false);
  };

  return (
    <div className="bg-disney-blue-100 p-5 md:p-10 xl:p-20">
      {!isEditing ? (
        <>
          <h1 className="text-[40px]/[48px] font-semibold">
            {formData.firstName} {formData.lastName}
          </h1>
          <h4 className="text-xs mt-2 mb-8">
            Last Updated{" "}
            {format(new Date(formData.lastUpdate), "MMMM do, yyyy")}
          </h4>
          <p className="text-lg/24 mb-4 font-bold">
            Age: {differenceInYears(new Date(), formData.birthDate!)}
          </p>
          <p className="text-lg/24 mb-4 font-bold">
            Location: {formData.city}, {formData.state}
          </p>
          <p className="text-lg/24 mb-4 font-bold">
            Favorite Disney Character: {formData.character}
          </p>
          <p className="text-lg/24 mb-4 font-bold">
            Favorite Disney Movie: {formData.movie}
          </p>
          <p className="text-lg/24 mb-8 font-bold">
            Favorite Disney Park: {formData.park}
          </p>
          <button
            className="disabled:opacity-50 disabled:cursor-not-allowed inline-block bg-disney-blue-500 text-white px-6 py-3 rounded-lg font-semibold text-base drop-shadow-[0_4px_4px_rgba(5,69,83,0.24)]"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-base font-bold text-secondary"
              >
                First name<sup className="text-red-500">*</sup>
              </label>
              <div className="">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      firstName: e.target.value,
                    })
                  }
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-base font-bold text-secondary"
              >
                Last name<sup className="text-red-500">*</sup>
              </label>
              <div className="">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lastName: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3 sm:col-end-4 ">
              <label
                htmlFor="birthday"
                className="block text-base font-bold text-secondary"
              >
                Birth Date<sup className="text-red-500">*</sup>
              </label>
              <div className="">
                <DatePicker
                  selected={formData.birthDate}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  onChange={(date) =>
                    setFormData({
                      ...formData,
                      birthDate: date,
                    })
                  }
                  className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-base font-bold text-secondary"
              >
                City<sup className="text-red-500">*</sup>
              </label>
              <div className="">
                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="city"
                  className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      city: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-1 ">
              <label
                htmlFor="state"
                className="block text-base font-bold text-secondary"
              >
                State<sup className="text-red-500">*</sup>
              </label>
              <div className="">
                <select
                  id="state"
                  name="state"
                  className="block h-9 w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      state: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">--</option>
                  {STATEABBREVIATIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="fav-char"
                className="block text-base font-bold text-secondary"
              >
                Favorite Disney Character<sup className="text-red-500">*</sup>
              </label>
              <div className="">
                <input
                  id="fav-char"
                  name="fav-char"
                  type="text"
                  autoComplete="fav-char"
                  className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  value={formData.character}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      character: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="fav-movie"
                className="block text-base font-bold text-secondary"
              >
                Favorite Disney Movie<sup className="text-red-500">*</sup>
              </label>
              <div className="">
                <input
                  id="fav-movie"
                  name="fav-movie"
                  type="text"
                  autoComplete="fav-movie"
                  className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  value={formData.movie}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      movie: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3 ">
              <label
                htmlFor="fav-park"
                className="block text-base font-bold text-secondary"
              >
                Favorite Disney Park<sup className="text-red-500">*</sup>
              </label>
              <div className="">
                <select
                  id="fav-park"
                  name="fav-park"
                  className="block h-9 w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                  value={formData.park}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      park: e.target.value,
                    })
                  }
                  required
                >
                  <option className="" value="">
                    Choose a park
                  </option>
                  <option>Florida</option>
                  <option>California</option>
                  <option>France</option>
                  <option>Tokyo</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-8 flex gap-4">
            <button
              className="disabled:opacity-50 disabled:cursor-not-allowed inline-block bg-disney-blue-500 text-white px-6 py-3 rounded-lg font-semibold text-base drop-shadow-[0_4px_4px_rgba(5,69,83,0.24)]"
              disabled={!signupEnabled}
              onClick={submitProfile}
            >
              Update Profile
            </button>
            <button
              className="inline-block bg-transparent text-disney-blue-500 border border-disney-blue-500 px-6 py-3 rounded-lg font-semibold text-base"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
