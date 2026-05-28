import { useForm } from "react-hook-form";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  return (
    <form onSubmit={handleSubmit(submitFn)}>
      <div className="form-line">
        <label htmlFor="title-input">Başlık</label>
        <input
          {...register("title", {
            required: { value: true, message: "Task başlığı yazmalısınız" },
            minLength: {
              value: 3,
              message: "Task başlığı en az 3 karakter olmalı",
            },
          })}
          placeholder="title"
          id="title-input"
        />
        <p>{errors.title?.message}</p>
      </div>
      <div className="form-line">
        <label htmlFor="description-input">Açıklama</label>
        <input
          {...register("description", {
            required: {
              value: true,
              message: "Task açıklaması yazmalısınız",
            },
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı",
            },
          })}
          placeholder="description"
          id="description-input"
        />
        <p>{errors.description?.message}</p>
      </div>
      <div className="form-line">
        <div className="checkbox-group">
          {kisiler.map((kisi) => {
            return (
              <label
                key={kisi}
                style={{ display: "block", marginBottom: "8px" }}
              >
                <input
                  type="checkbox"
                  value={kisi}
                  {...register("people", {
                    validate: (value) => {
                      if (value.length > 3) {
                        return "En fazla 3 kişi seçebilirsiniz";
                      } else if (value.length < 1) {
                        return "Lütfen en az bir kişi seçin";
                      } else {
                        return true;
                      }
                    },
                  })}
                />
                <span style={{ marginLeft: "8px" }}>{kisi}</span>
              </label>
            );
          })}
        </div>
        {errors.people && <p>{errors.people.message}</p>}
      </div>
      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
