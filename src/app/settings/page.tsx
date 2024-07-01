"use client"

import Checkbox from "@/components/forms/Checkbox";
import Dropdown from "@/components/forms/Dropdown";
import NumberDropdown from "@/components/forms/NumberDropdown";
import NumberInput from "@/components/forms/NumberInput";
import TextInput from "@/components/forms/TextInput";

/**
 * Screen from which to modify the app instance's settings
 * 
 * @returns Settings screen
 */
export default function Settings() {

    const save = () => {}

    const lettersTextArr = ["4", "5", "6", "7"]
    const lettersValues = [4, 5, 6, 7]

    const databaseTextArr = ["JSON (only suitable for smaller dictionaries)", "MongoDB", "MySQL", "PostgreSQL"]
    const databaseValues = ["json", "mongo", "mysql", "postgres"]
    
  return (
    
    <div className="row justify-content-center">
      <div className="col-12 col-sm-10 col-lg-9 col-xl-6">
        
        <div>
          <h2 className="m-3 text-center">
            Setup
          </h2>

          <div className="p-3">
            <form>

                <NumberDropdown
                    id="letters"
                    label="Number of letters in the word to guess"
                    optionText={lettersTextArr}
                    optionValues={lettersValues}
                    value={model.letters}
                    setValue={model.setLetters}
                    />

                <NumberInput id="attempts" label="Number of attempts to guess correctly. 0 = infinite attempts"/>

                <Checkbox
                  id="keyColor"
                  label="Grey out keyboard when letters have been used"
                  value={model.keyColor}
                  setValue={model.setKeyColor}
                  />

                <Checkbox
                  id="warnAlreadyAttempted"
                  label="Show warning if a selected letter has already been ruled out"
                  value={model.warnAlreadyAttempted}
                  setValue={model.setWarnAlreadyAttempted}
                  />

                <Dropdown
                    id="database"
                    label="Possible words storage"
                    optionText={databaseTextArr}
                    optionValues={databaseValues}
                    value={model.dbType}
                    setValue={model.setDbType}
                    />

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
