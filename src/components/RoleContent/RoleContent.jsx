const RoleContent = ({ user, handleMakeAdmin, handleMakeDeliveryMan }) => {
  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">
            do you want a change role here?
          </h3>
          <p className="py-4"></p>
          <div className="modal-action">
            <form method="dialog">
              <div className="space-x-3">
                <button
                  onClick={() => handleMakeAdmin(user)}
                  className="btn  btn-lg bg-orange-500 text-white"
                >
                  Make Admin
                </button>
                <button
                  onClick={() => handleMakeDeliveryMan(user)}
                  className="btn  btn-lg bg-orange-500 text-white"
                >
                  Make deliveryman
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default RoleContent;
