//HOOKS
import { useState, useEffect, ChangeEvent } from "react";
import { useAuth } from "../authContext/AuthProvider";

import { Sidebar } from "../components/Sidebar";
import { SectionBanner } from "../components";
import { PageContent } from "../ui/pageContent";
import { TextField } from "../ui/form/textField";
import { Button } from "../ui/controls/button";

//TYPES
import { Status } from "../types";
import { User } from "../authContext/types";
import { toast } from "react-toastify";

interface Form extends React.FormEvent<HTMLFormElement> {
  loginemail: HTMLInputElement;
  password: HTMLInputElement;
}

type UserData = {
  loginemail?: User["loginemail"];
  password?: User["password"];
};

export const MyProfile = () => {
  const { userData, setUserData } = useAuth();
  const [status, setStatus] = useState<Status>(Status.init);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const updateUser = async (newUserData: UserData) => {
    try {
      const body = newUserData;
      const id = userData.id;

      const response = await fetch(`https://edendeskcrm.herokuapp.com/user/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserData),
      });

      const parseRes = await response.json();
      toast.success("Información actualizada con éxito");
    } catch (error) {
      toast.error("Ha habido un error");
      error instanceof Error && console.error(error);
    }
  };

  const onUpdateValue = (e: Form) => {
    e.preventDefault();

    const validEmail = (loginemail: string) => {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginemail);
    }

    const email = e.currentTarget.loginemail;
    const password = e.currentTarget.password;
    const rPassword = e.currentTarget.rPassword;

    if (!email.value && !password.value) {
      toast.error("No hay datos a editar")
      return;
    } 

    if (email.value && !password.value) {
      if(!validEmail(email.value)) {
        toast.error("Escriba un email valido")
        return;
      }
      updateUser({ loginemail: email.value });
      setUserData({...userData, loginemail: email.value})
    }

    if (password.value && !email.value) {
      if(password.value !== rPassword.value) {
        toast.error("Las contraseñas no coinciden")
        return;
      }
      updateUser({password: password.value});
    }

    if(email.value && password.value && password.value === rPassword.value) {
      if(!validEmail(email.value)) {
        toast.error("Escriba un email valido")
        return;
      }
      if(password.value !== rPassword.value) {
        toast.error("Las contraseñas no coinciden")
        return;
      }

      updateUser({loginemail: email.value, password: password.value})
      setUserData({...userData, loginemail: email.value})
    }
  };

  useEffect(() => {
    setStatus(Status.success);
  }, [userData]);

  return (
    <div className="md:flex">
      <Sidebar />
      <div className="w-full">
        <SectionBanner sectionName="Mis Datos" />
        <PageContent direction="flex-col" status={status}>
          <h2 className="text-2xl font-semibold mt-3">Datos del usuario</h2>
          <div className="w-full my-1 py-1 px-1">
            <div className="py-2">
              <p className="mb-1 text-lg font-semibold text-gray-700">
                {userData.firstname}
              </p>
              <p className="mb-1 md:text-lg font-semibold text-indigo-500">
                {userData.loginemail}
              </p>
            </div>
            <form onSubmit={onUpdateValue}>
              <div className="mb-5">
                <label htmlFor="userName-info">Nuevo correo</label>
                <TextField
                  name="loginemail"
                  placeholder={userData.loginemail}
                />
              </div>

              <h3 className="text-lg font-semibold my-4">Cambiar contraseña</h3>

              <div className="mb-3">
                <label htmlFor="userName-info">Nueva contraseña</label>
                <TextField
                  name="password"
                  type="password"
                  placeholder="*******"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="userName-info">Repetir contraseña</label>
                <TextField
                  name="rPassword"
                  type="password"
                  placeholder="*******"
                />
              </div>
              <div className="w-2/4 mx-auto flex justify-center">
                <Button colorScheme="secondary">Editar</Button>
              </div>
            </form>
          </div>
        </PageContent>
      </div>
    </div>
  );
};
