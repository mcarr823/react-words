import Link from "next/link"

/**
 * Default website screen
 * 
 * @returns Home screen
 */
export default function Home() {
  return (
    
    <div className="row justify-content-center">
      <div className="col-12 col-sm-10 col-lg-9 col-xl-6">
        
        <div>
          <h2 className="m-3">
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
            <Link
              href="/play"
              className="btn btn-primary btn-lg"
              >
                Play Now!
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
