import { jwtDecode } from "jwt-decode";
export function currentUser() {
    const token = localStorage.getItem('access_token')
    const decodeToken = jwtDecode(token)
    
    return decodeToken.user_id
        
    
}
