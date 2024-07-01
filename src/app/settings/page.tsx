"use client"

import Checkbox from "@/components/forms/Checkbox";
import NumberDropdown from "@/components/forms/NumberDropdown";
import NumberInput from "@/components/forms/NumberInput";
import PairDropdown from "@/components/forms/PairDropdown";
import TextInput from "@/components/forms/TextInput";
import DatabaseType from "enums/DatabaseType";

/**
 * Screen from which to modify the app instance's settings
 * 
 * @returns Settings screen
 */
export default function Settings() {

    const save = () => {}

    const lettersTextArr = ["4", "5", "6", "7"]
    const lettersValues = [4, 5, 6, 7]

    const databaseTypes = DatabaseType.all()
    
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

                <NumberInput
                  id="attempts"
                  label="Number of attempts to guess correctly. 0 = infinite attempts"
                  value={model.attempts}
                  setValue={model.setAttempts}
                  />

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

                <PairDropdown
                    id="database"
                    label="Possible words storage"
                    options={databaseTypes}
                    value={model.dbType}
                    setValue={model.setDbType}
                    />

                <TextInput
                  id="dbHost"
                  label="Database host"
                  value={model.dbHost}
                  setValue={model.setDbHost}
                  />

                <NumberInput
                  id="dbPort"
                  label="Database port"
                  value={model.dbPort}
                  setValue={model.setDbPort}
                  />

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
