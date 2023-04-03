import React from "react";
import { toast } from "react-toastify";

const CreateMagazinePrice = (props) => {
  function submit() {
    if (props.newModel.Shuma !== undefined) {
      props.saveData(props.newModel);
    } else {
      toast.error("Shtypni nje shume valide");
    }
  }

  return (
    <div className='container'>
      <div className='rbt-card '>
        <p className='rbt-card-text'>{props.magazineName}</p>
        <div className='form-group'>
          <label>Vendosni çmimin</label>
          <input
            type='text'
            className='w-75'
            onChange={(e) => {
              props.setModel({ ...props.newModel, Shuma: e.target.value });
            }}
          />
          <a onClick={submit}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width={16}
              height={16}
              fill='currentColor'
              className='bi bi-check-lg'
              viewBox='0 0 16 16'
            >
              <path d='M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z' />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
export default CreateMagazinePrice;
