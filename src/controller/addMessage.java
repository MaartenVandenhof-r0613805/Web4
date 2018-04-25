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

public class addMessage extends RequestHandler {
    @Override
    public String handleRequest(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        Person user = (Person) session.getAttribute("user");

        String friendId = (String)request.getParameter("currentFriendId");
        String message = (String)request.getParameter("message");
        System.out.println(message);
        personService.addMessage(user.getUserId(), friendId, message);
        return null;

    }
}