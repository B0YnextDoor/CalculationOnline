import axios from "axios";
import { makeAutoObservable } from "mobx";
import { $api } from "../utils/api/api";

export default class User {
  email = "";
  isAuth = false;
  text = "";

  severity = "success";

  constructor() {
    makeAutoObservable(this);
  }

  setText(text, severity = "success") {
    this.text = text;
    this.severity = severity;
  }

  setAuth(flag) {
    this.isAuth = flag;
  }

  async login(email, password) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}auth/users/`,
        { email, password }
      );

      if (response.status === 201) {
        this.setText("Ваш аккаунт успешно зарегистрирован.");
        await this._getJWT(email, password);
        return;
      }
    } catch (error) {
      if (error.response?.data?.email) {
        if (
          "custom user model with this email already exists." ===
          error.response?.data?.email[0]
        ) {
          await this._getJWT(email, password);
        } else {
          this.setText(error.response?.data?.email[0]);
        }
      }

      if (error.response?.data?.password) {
        // this.setPassError(error.response?.data?.password[0])
      }

      if (error.response?.data?.status === 400) {
        await this._getJWT(email, password);
      }
    }
  }

  async _getJWT(email, password) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}auth/jwt/create/`,
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem("mptok", response.data.access);
      let date = new Date();
      document.cookie = `mptok=${
        response.data.refresh
      }; path=/;expires=${date.setTime(date.getTime() + 60 * 60 * 24)}`;

      this.setAuth(true);
    } catch (error) {
      this.errorMessage = error.response.data?.detail;
    }
  }

  async loadLenth(maxFileSize) {
    try {
      await $api.post("users/change/", { max_file_size: Number(maxFileSize) });
      this.errorMessage = "Размер файла успешно сменен";
    } catch (error) {
      this.errorMessage = "Ошибка при смене файла";
      this.severity = "error";
    }
  }

  async loadFile(filename, base64) {
    const formData = new FormData();
    formData.append("file_dxf", base64);
    formData.append("name_file", filename);

    try {
      const data = await axios.post(
        process.env.REACT_APP_BASE_URL + "calc/calc_dxf/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.data.length) {
        return data.data;
      } else return [data.data];
    } catch (error) {
      this.text = "Ошибка загрузки";
      this.severity = "error";
      return [];
    }
  }

  async getCalculated() {
    try {
      const data = await $api.get(
        process.env.REACT_APP_BASE_URL + "orders/calculated/"
      );
      return data.data;
    } catch (error) {
      this.text = "Ошибка";
      this.severity = "error";
    }
  }

  async getProcessed() {
    try {
      const data = await $api.get(
        process.env.REACT_APP_BASE_URL + "orders/processed/"
      );
      return data.data;
    } catch (error) {
      this.text = "Ошибка";
      this.severity = "error";
    }
  }

  async getMaterials() {
    try {
      const data = await axios.get(
        process.env.REACT_APP_BASE_URL + "materials/get/"
      );
      return data.data;
    } catch (error) {
      this.text = "Ошибка";
      this.severity = "error";
      return [];
    }
  }

  async addMaterial(name, price_m2, weight_m2) {
    try {
      const data = await $api.post(
        process.env.REACT_APP_BASE_URL + "materials/create-material/",
        {
          name: name,
          price_m2: price_m2,
          weight_m2: weight_m2,
        }
      );
      return data.data;
    } catch (error) {
      this.text = "Ошибка";
      this.severity = "error";

      return null;
    }
  }

  async addLength(from_length, to_length, price, material) {
    try {
      const data = await $api.post(
        process.env.REACT_APP_BASE_URL + "materials/create-length/",
        {
          from_length: from_length,
          to_length: to_length,
          price: price,
          material_id: material,
        }
      );
      this.text = "Длина успешно добавлена";

      return data.data;
    } catch (error) {
      this.text = "Error";
      this.severity = "warning";
    }
  }

  async deleteMaterial(id) {
    try {
      const data = await $api.post(
        process.env.REACT_APP_BASE_URL + "materials/delete-material/",
        {
          id: id,
        }
      );
      return data.data;
    } catch (error) {
      this.text = "Error";
    }
  }

  async deleteLength(id) {
    try {
      return await $api.post(
        process.env.REACT_APP_BASE_URL + "materials/delete-length/",
        {
          id: id,
        }
      );
    } catch (error) {
      this.text = "Error";
    }
  }

  async editMaterial(id, from_length, to_length) {
    try {
      return await $api.post(
        process.env.REACT_APP_BASE_URL + "materials/edit-material/",
        {
          id,
          from_length,
          to_length,
        }
      );
    } catch (error) {
      this.text = "Error";
    }
  }

  async editLength(price, id) {
    try {
      return await $api.post(
        process.env.REACT_APP_BASE_URL + "materials/create-length/",
        {
          id: id,
          price: price,
        }
      );
    } catch (error) {
      this.text = "Error";
    }
  }

  async createOrder(data) {
    try {
      return await axios.post(
        process.env.REACT_APP_BASE_URL + "orders/create/",
        data
      );
    } catch (error) {
      this.text = "Error";
    }
  }

  getMe() {
    (async () => {
      try {
        const resp = await $api.get("auth/users/me/");
        const data = resp.data;
        this.isAuth = true;
        this.email = data.email;
      } catch (err) {}
    })();
  }

  getIndexLengths(lengths, total_length_count) {
    if (lengths.length > 0) {
      for (let i = 0; i < lengths.length; i++) {
        if (
          lengths[i].from_length <= total_length_count &&
          lengths[i].to_length >= total_length_count
        ) {
          return i;
        }

        if (lengths[lengths.length - 1].to_length <= total_length_count) {
          return lengths.length - 1;
        }
      }
    }

    return 0;
  }
}
