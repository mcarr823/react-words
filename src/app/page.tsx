"use client"

import InfoModal from "@/components/modal/InfoModal";
import Link from "next/link"
import ModalViewModel from "viewmodels/ModalViewModel";

/**
 * Default website screen
 * 
 * @returns Home screen
 */
export default function Home() {

  const model = ModalViewModel()

  return (
    
    <div className="row justify-content-center">
      <div className="col-12 col-sm-10 col-lg-9 col-xl-6">
        
        <div>
          <h2 className="m-3 text-center">
            Welcome to Words!
          </h2>

          <div className="p-3">
            <p>
              Words is a self-hosted Wordle clone which lets you choose your own difficulty and word list.
            </p>
            <p>
              Press Play to get started, or go into Setup to modify your experience.
            </p>
          </div>

          <div className="card-footer text-center pt-3">
            <button
              className="btn btn-warning btn-lg"
              onClick={model.showModal}
              >
                How To Play
            </button>
            <Link
              href="/play"
              className="btn btn-primary btn-lg ms-3"
              >
                Play Now!
            </Link>
          </div>

          <InfoModal model={model}/>
          
        </div>
      </div>
    </div>
  );
}
