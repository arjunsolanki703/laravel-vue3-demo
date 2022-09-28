import { shallowMount, flushPromises } from "@vue/test-utils";
import App from "../App.vue";
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios;

const message = 'success';
const fakeBook = { "firstname": "Arjun", "lastname": "Solanki", "middlename": "V", "dateofbirth": new Date()}
const fakeData = Promise.resolve({"data": fakeBook});


describe("App.vue", () => {

  it("correctly mounts with correct data", async () => {

    mockedAxios.post.mockReturnValueOnce(fakeData);

    const wrapper = shallowMount(App, mockedAxios);

    expect(axios.post).toBeCalledWith("http://localhost:8000/register-user");

    await flushPromises();
    expect(wrapper.vm.data.status).toBe(message);
  });

});
