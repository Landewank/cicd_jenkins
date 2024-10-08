import React from "react";
import logo from "../../assets/images/logo.png";
import { List, Navigation} from "../ui/uiSmallGroup";


export const Footer = () => {
  return (
    <footer>
      <div className="bg-secondary md:p-10 flex justify-around flex-wrap md:items-center md:flex-row lg:items-start lg:gap-0 s:gap-3 s:p-5 s:flex-col s:items-center">
        <div className="text-basic_white w-72">
          <div className="flex justify-center mb-4">
            <img className="w-[135px] h-auto" src={logo} alt="" />
          </div>
          <div className="flex flex-col gap-2 text-lg s:items-center md:items-start ">
            <List text="Banyumas, West Java, Indonesia" icon="location" />
            <List text="lanafatemani@gmail.com" icon="mail" />
            <List text="(+62) 812-2761-5859" icon="call" />
          </div>
        </div>

        <div className="w-40">
          <div className="mb-5">
            <h2 className="text-4xl text-basic_white  md:text-left s:text-center">Halaman</h2>
          </div>
          <Navigation text="Beranda"></Navigation>
          <Navigation text="Portfolio"></Navigation>
          <Navigation text="Service"></Navigation>
          <Navigation text="Tentang Kami"></Navigation>
        </div>

        <div className="w-40">
          <div className="mb-5">
            <h2 className="text-4xl text-basic_white md:text-left s:text-center">Kategori</h2>
          </div>
          <Navigation text="Destinasi Wisata"></Navigation>
          <Navigation text="Kuliner"></Navigation>
          <Navigation text="Budaya"></Navigation>
          <Navigation text="Akomodasi"></Navigation>
        </div>

        <div className="w-60">
          <div className="mb-5">
            <h2 className="text-4xl text-basic_white lg:text-left s:text-center">Informasi</h2>
          </div>
          <div>
            <blockquote className="text-basic_white text-justify">
            Jika ada pertanyaan hubungi kami sekarang,  informasi lebih lanjut.
            </blockquote>
          </div>
          <div className="flex gap-4 mt-2">
            <div className="inline-flex items-center text-basic_white text-2xl p-3 bg-[#049032] cursor-pointer rounded-tl-xl rounded-tr-sm rounded-bl-sm rounded-br-xl transition duration-500 hover:bg-primary">
            <ion-icon name="logo-whatsapp"></ion-icon>
            </div>
            <div className="inline-flex items-center text-basic_white text-2xl p-3 bg-[#e92476] cursor-pointer rounded-tl-xl rounded-tr-sm rounded-bl-sm rounded-br-xl  transition duration-500 hover:bg-primary">
            <ion-icon name="logo-instagram"></ion-icon>
            </div>
            <div className="inline-flex items-center text-basic_white text-2xl p-3 bg-black cursor-pointer rounded-tl-xl rounded-tr-sm rounded-bl-sm rounded-br-xl  transition duration-500 hover:bg-primary">
            <ion-icon name="logo-tiktok"></ion-icon>
            </div>
            <div className="inline-flex items-center text-basic_white text-2xl p-3 bg-[#EE1212] cursor-pointer rounded-tl-xl rounded-tr-sm rounded-bl-sm rounded-br-xl  transition duration-500 hover:bg-primary">
            <ion-icon name="logo-youtube"></ion-icon>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};