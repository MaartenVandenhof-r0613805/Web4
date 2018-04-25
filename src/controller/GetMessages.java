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

public class GetMessages extends RequestHandler {
    @Override
    public String handleRequest(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        Person user = (Person) session.getAttribute("user");
        ArrayList<String> messages = new ArrayList<>();
        try{
            String friendId = (String)request.getParameter("friendId");
            messages = user.getMessages(friendId);
        } catch (Exception e){
            e.printStackTrace();
        }

        try{
            String json = toJSON(messages);
            response.setContentType("application/json/messages");
            response.getWriter().write(json);
        } catch (JsonProcessingException e){
            e.printStackTrace();
        } catch (IOException e){
            e.printStackTrace();
        }

        return null;
    }

    @JsonIgnore
    public String toJSON(Object list) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(list);
    }
}