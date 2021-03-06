import { Link } from "react-router-dom";

import { Navbar } from "../ui/navbar";
import { NavItem } from "../ui/navbar";
import { Hero } from "../ui/hero";
import { Button } from "../ui/controls/button";
import { BrandSection } from "../components/brandsSection";
import { InfoSection } from "../components/InfoSection";
import { Footer } from "../ui/footer";

//ICONS
import { FontAwesomeIcon, RegisterIcon } from "../ui/icons";

export const Home = () => {
  return (
    <>
      <Navbar>
        <div className="">
          <Link to="/">
            <img
              className="w-[100px]"
              src={require("../img/edendesklogohome.png")}
              alt="logo"
            />
          </Link>
        </div>
        <div className="">
          <Link to="/registro">
            <Button colorScheme="borders">
              Registrate<span className="hidden lg:inline"> gratis</span>
              <FontAwesomeIcon
                icon={RegisterIcon}
                className="ml-2"
              ></FontAwesomeIcon>
            </Button>
          </Link>
        </div>
      </Navbar>
      <Hero>
        <div className="p-8">
          <h1 className="text-indigo-700 text-center text-4xl md:text-5xl lg:text-7xl font-bold mb-5">
            Administra a tus clientes
          </h1>
          <p className="text-slate-500 text-lg md:text-xl lg:text-2xl text-center">
            con Edendesk. El CRM pensado tanto para gestionar tus ventas y consumos como para organizar a tus clientes
          </p>
          <div className="w-full mt-5 lg:mt-14 flex justify-center">
            <Link to="/login">
              <Button colorScheme="primary">Inicia Sesión</Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            className="md:max-w-[400px] lg:max-w-[800px]"
            src="https://i.ibb.co/N9nL6GT/edendeskhomewallpaper.webp"
            alt="heroimage"
          />
          <img
          className="hidden lg:block"
            src="https://i.ibb.co/dfWyb5q/handsphone.webp"
            alt="handsphone"
          />
        </div>
      </Hero>
      <BrandSection>
        <div>
          <h2 className="hidden md:block text-gray-500 font-bold text-lg lg:text-2xl">
            Agilizando tareas de compañías como
          </h2>
        </div>
        <div className="flex items-center justify-center gap-4 py-2">
          <img
            className="w-[75px] lg:w-[100px]"
            src={require("../img/edenred.png")}
            alt="edenred"
          />
          <img
            className="w-[75px] lg:w-[100px]"
            src={require("../img/proviammo.png")}
            alt="proviamo"
          />
          <img
            className="w-[75px] lg:w-[100px]"
            src={require("../img/almacen.png")}
            alt="almacen"
          />
        </div>
      </BrandSection>
      <InfoSection />
      <Footer>
        <img className="w-[70px]" src={require("../img/logo.png")} alt="logo" />
        <p className="text-indigo-900">by Facundo Acosta :)</p>
      </Footer>
    </>
  );
};
