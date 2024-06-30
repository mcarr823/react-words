"use client"

import Checkbox from "@/components/forms/Checkbox";
import NumberInput from "@/components/forms/NumberInput";
import TextInput from "@/components/forms/TextInput";

/**
 * Screen from which to modify the app instance's settings
 * 
 * @returns Settings screen
 */
export default function Settings() {

    const save = () => {}
    
  return (
    
    <div className="row justify-content-center">
      <div className="col-12 col-sm-10 col-lg-9 col-xl-6">
        
        <div>
          <h2 className="m-3 text-center">
            Setup
          </h2>

          <div className="p-3">
            <form>

                <div className="mb-3">
                    <label htmlFor="letters" className="form-label">Number of letters in the word to guess</label>
                    <select id="letters" className="form-select">
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                </div>

                <NumberInput id="attempts" label="Number of attempts to guess correctly. 0 = infinite attempts"/>

                <Checkbox id="keyColor" label="Grey out keyboard when letters have been used"/>

                <Checkbox id="warnAlreadyAttempted" label="Show warning if a selected letter has already been ruled out"/>

                <div className="mb-3">
                    <label htmlFor="database" className="form-label">Possible words storage</label>
                    <select id="database" className="form-select">
                        <option value="json">JSON (only suitable for smaller dictionaries)</option>
                        <option value="mongo">MongoDB</option>
                        <option value="mysql">MySQL</option>
                        <option value="postgres">PostgreSQL</option>
                    </select>
                </div>

                <TextInput id="dbHost" label="Database host"/>

                <NumberInput id="dbPort" label="Database port"/>

            </form>
          </div>

          <div className="card-footer text-center pt-3">
            <button className="btn btn-primary btn-lg" onClick={save}>Save</button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
