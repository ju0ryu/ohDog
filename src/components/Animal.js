import React, { useState } from 'react';
import '../css/animal.scss';

const Animal = () => {
  const [insertForm, setInsertForm] = useState(false);

  const addForm = () => {
    setInsertForm(true);
  };

  return (
    <div>
      <div>
        <input type="button" value="➕" onClick={addForm} />
      </div>
      <div>
        {insertForm && (
          <form>
            <tr>
              <input />
            </tr>
          </form>
        )}
      </div>
    </div>
  );
};

export default Animal;
