import { React, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { auth, db, storage } from "../../firebase-config";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { AddListingsModal } from "../LandLord/AddListingsModal";
import AddTenantModal from "./AddTenantModal";
import Modal from "./Modal";
import { SendNotificationsModal } from "../LandLord/SendNotificationsModal";

export const Home = () => {
  let navigate = useNavigate();
  const auth = getAuth();
  let notificationList = "<br>";

  const { currentUser, accountType } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(1);
  const [publicNotification, setPublicNotification] = useState("");
  const [privateNotification, setPrivateNotification] = useState("");

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("Auth Token");
    return (
      auth.currentUser &&
      (() => {
        auth.signOut();
        navigate("/login");
      })
    );
  };

  const getNotifications = async () => {
    try {
      const landlordRef = await getDocs(collection(db, "users"));
      const notificationRef = await getDocs(collection(db, "notifications2"));

      let landlord = "";
      let publicContent = "";
      let privateContent = "";
      let date = "";
      let timestamp = "";

      landlordRef.forEach((element) => {
        if (element.id == currentUser.uid) {
          landlord = element.data().land_lord_id;
        }
      });

      notificationRef.forEach((element) => {
        if (element.id == landlord) {
          console.log(element.data().publicNotification);
          for (let i = 0; i < element.data().privateNotification.length; i++) {
            if (
              element.data().privateNotification[i].tenant_id ===
              currentUser.uid
            ) {
              privateContent =
                element.data().privateNotification[i].text +
                "<br>" +
                privateContent;
              //timestamp = element.data().privateNotification[i].time
              //date = timestamp.getHours() + ":" + timestamp.getMinutes() + ", "+ timestamp.toDateString()
              //privateContent += date + "<br>"
            }
          }

          for (let i = 0; i < element.data().publicNotification.length; i++) {
            publicContent =
              element.data().publicNotification[i].text +
              "<br>" +
              publicContent;
            //publicContent += element.data().publicNotification[i].time + "<br>";
          }
        }
      });

      setPublicNotification(publicContent);
      setPrivateNotification(privateContent);
    } catch (e) {
      console.log("landlord not found");
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div>
      <div class="flex justify-center items-center bg-gradient-to-b from-slate-200 to-white">
        <div class="text-center relative z-10">
          <h1 class="text-2xl md:text-4xl font-bold text-black my-4 md:my-8 px-4 py-6 md:px-4 md:py-8 rounded-lg shadow-lg bg-slate-100">
            Welcome to <span class="text-gray-700">myBuilding</span>!
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
        <div>
          <p id="p"></p>
        </div>

        <div className="w-full md:w-auto mt-4 md:mt-0 ml-0 md:ml-4">
          <div className="h-80 w-full overflow-auto border p-4 rounded-lg shadow-lg transition duration-300">
            <div className="font-bold text-center">
              <p>Notifications</p>
              <br />
            </div>

            <div className="flex justify-between border-b border-gray-500 pb-2 mb-2">
              <button
                className={`px-4 py-2  ${
                  activeTab === 1 ? "bg-emerald-500 text-white" : "bg-gray-300"
                }`}
                onClick={() => handleTabClick(1)}
              >
                Announcements
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === 2 ? "bg-emerald-500 text-white" : "bg-gray-300"
                }`}
                onClick={() => handleTabClick(2)}
              >
                Landlord Alerts
              </button>
            </div>
            <div>
              {activeTab === 1 && (
                <p dangerouslySetInnerHTML={{ __html: publicNotification }}></p>
              )}
              {activeTab === 2 && (
                <p
                  dangerouslySetInnerHTML={{ __html: privateNotification }}
                ></p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center md:flex-row md:items-start gap-2 md:gap-4 mt-2 md:mt-0">
          <div className="flex flex-row md:flex-col items-center md:items-start gap-2 md:gap-4 p-1">
            {accountType === "LandLord" && <AddTenantModal />}
            {accountType === "LandLord" && <AddListingsModal />}
            {accountType === "LandLord" && <SendNotificationsModal />}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
