import api from "@/lib/axios";

export const login = async (data) => {
    const response = await api.post("/auth/login", data);
    return response.data;
};

export const register = async (data) => {
    const response = await api.post("/auth/register", data);
    return response.data;
};
import api from "@/lib/axios";

export const getProjects = async () => {
    const response = await api.get("/projects");
    return response.data;
};
const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
});