package controller;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import domain.Person;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;

public class GetFriendList extends RequestHandler {
    @Override
    public String handleRequest(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        Person user = (Person) session.getAttribute("user");

        ArrayList<Person> list = user.getFriendlist();

        try{
            String json = toJSON(list);

            response.setContentType("application/json");
            response.getWriter().write(json);
        } catch (JsonProcessingException e){
            e.printStackTrace();
        } catch (IOException e){
            e.printStackTrace();
        }

        System.out.println("test: " + user.getFirstName() + " " + user.getFriendlist().size());
        return null;
    }

    @JsonIgnore
    public String toJSON(Object list) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        System.out.println("Voor return " + mapper.writeValueAsString(list));
        return mapper.writeValueAsString(list);
    }
}