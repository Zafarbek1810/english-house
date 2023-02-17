import { Button, Drawer, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../../Layout";
import { ModalContent, ModalHeader, TeachersWrapper } from "./Teachers.style";
import CloseSvg from "../../../../Common/Svgs/CloseSvg";
import { useForm } from "react-hook-form";
import AdminProvider from "../../../../../Data/AdminProvider";
import { toast } from "react-toastify";
import EditSvg from "../../../../Common/Svgs/EditSvg";
import DeleteSvg from "../../../../Common/Svgs/DeleteSvg";
import MinLoader from "../../../../Common/MinLoader";
import ButtonLoader from "../../../../Common/ButtonLoader";
import Pagination from "rc-pagination";

const TeachersMain = ({ RefObj, setIsOpen }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [forRender, setForRender] = useState(null);
  const [editing, setEditing] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(20);

  const onChange = (page) => {
    setCurrentPage(page);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };
  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    setLoading(true);
    AdminProvider.getAllTeacher(currentPage, 10)
      .then((res) => {
        console.log(res.data.data);
        setTeachers(res.data.data);
        setTotalElements(res.data.recordsTotal);
        console.log(data.recordsTotal);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [forRender, currentPage]);

  const onSubmitTeacher = async (values) => {
    const body = {};
    body.firstName = values.firstName;
    body.lastName = values.lastName;
    body.userName = values.userName;
    body.password = values.password;

    console.log("body", body);
    setLoading2(true);
    if (editing) {
      body.id = editing.id;
      try {
        const { data } = await AdminProvider.updateTeacher(editing.id, body);
        setForRender(Math.random());
        reset();
        toast.success("Muvaffaqiyatli o'zgartirildi");
        setIsOpenModal(false);
      } catch (err) {
        console.log(err);
      }
      setLoading2(false);
    } else {
      AdminProvider.createTeacher(body)
        .then((res) => {
          reset();
          setForRender(Math.random());
          toast.success("Qo'shildi");
          onCloseModal();
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.message);
        })
        .finally(() => {
          setLoading2(false);
        });
    }
  };

  const handleDeleteTeacher = (obj) => {
    RefObj.current.textContent = `Rostdan ham o'chirishni xoxlaysizmi?`;
    setIsOpen(true);
    new Promise((res, rej) => {
      RefObj.current.resolve = res;
      RefObj.current.reject = rej;
    })
      .then(async () => {
        await AdminProvider.deleteTeacher(obj.id);
        setTeachers((p) =>
          p.filter((teach) => {
            return teach.id !== obj.id;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditTeacher = (obj) => {
    setIsOpenModal(true);
    setEditing(obj);
    setValue("firstName", obj.firstName);
    setValue("lastName", obj.lastName);
  };

  return (
    <DashboardLayout>
      <TeachersWrapper>
        <div className="top">
          <h3>O`qituvchilar</h3>
          <Button
            className="col-3"
            variant="contained"
            onClick={() => openModal()}
            style={{
              fontFamily: "Azo sans",
              color: "#fff",
              background: "#787EFF",
            }}
          >
            O`qituvchi qo`shish
          </Button>
        </div>

        <table className="table table-borderless table-hover">
          <thead>
            <tr>
              <th style={{ width: "40%" }} className="col">
                Familyasi
              </th>
              <th style={{ width: "30%" }} className="col">
                Ismi
              </th>
              <th style={{ width: "30%" }} className="col">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              teachers ? (
                teachers.map((obj, index) => (
                  <tr key={index}>
                    <td style={{ width: "40%" }} className="col">
                    {(currentPage-1)*10+index+1}. {obj.lastName}
                    </td>
                    <td style={{ width: "30%" }} className="col">
                      {obj.firstName}
                    </td>
                    <td style={{ width: "30%" }} className="col">
                      <div className="btns">
                        <IconButton
                          style={{ background: "rgb(253, 181, 40, 0.12)" }}
                          onClick={() => handleEditTeacher(obj)}
                        >
                          <EditSvg />
                        </IconButton>
                        <IconButton
                          style={{ background: "rgb(253, 181, 40, 0.12)" }}
                          onClick={() => handleDeleteTeacher(obj)}
                        >
                          <DeleteSvg />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: 30,
                  }}
                >
                  <h3 style={{ color: "rgba(0, 0, 0, 0.7)" }}>
                    O`qituvchilar mavjud emas!
                  </h3>
                </div>
              )
            ) : (
              <MinLoader />
            )}
          </tbody>
        </table>

        <Pagination
          onChange={onChange}
          current={currentPage}
          total={totalElements}
          pageSize={10}
        />
      </TeachersWrapper>

      {/* =====drawer ========== */}

      <Drawer
        anchor={"right"}
        open={isOpenModal}
        onClose={() => {
          onCloseModal();
        }}
      >
        <ModalHeader className="modal-header">
          <h2 className="title">O&#39;qituvchi qo`shish</h2>
          <button className="closeSvg" onClick={onCloseModal}>
            <CloseSvg />
          </button>
        </ModalHeader>
        <ModalContent>
          <form
            className="p-3"
            style={{ width: 500 }}
            onSubmit={handleSubmit(onSubmitTeacher)}
          >
            <div className="label">
              <label>O`qituvchi ismi</label>
              <input
                autoComplete="off"
                className="form-control"
                placeholder={"Ismi"}
                {...register("firstName", { required: true })}
              />
            </div>
            <div className="label">
              <label>O`qituvchi familyasi</label>
              <input
                autoComplete="off"
                className="form-control"
                placeholder={"Familyasi"}
                {...register("lastName", { required: true })}
              />
            </div>
            <div className="label">
              <label>Username</label>
              <input
                autoComplete="off"
                className="form-control"
                placeholder={"Username"}
                {...register("userName", { required: true })}
              />
            </div>
            <div className="label">
              <label>Parol</label>
              <input
                autoComplete="off"
                className="form-control"
                placeholder={"Parol"}
                {...register("password", { required: true })}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ display: "flex" }}
            >
              Qo`shish {loading2 && <ButtonLoader />}
            </button>
          </form>
        </ModalContent>
      </Drawer>
    </DashboardLayout>
  );
};

export default TeachersMain;
