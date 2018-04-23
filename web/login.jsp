<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<!DOCTYPE html>
<html>

<head>
    <meta name="application-name" content="width=device-width, initial-scale=1">
    <title>JSON and AJAX</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet">
    <link rel="stylesheet" href="main.css">
</head>

<body>
    <header>
    </header>
    <div id="login">
       <h2>Login</h2>
        <c:if test="${errors.size()>0 }">
            <div class="danger">
                <ul>
                    <c:forEach var="error" items="${errors }">
                        <li>${error }</li>
                    </c:forEach>
                </ul>
            </div>
        </c:if>
        <form action="Controller?action=LogIn" method="post">
        <label for="email">Name: </label>
        <input type="text" id="email" name="email">
        <label for="password">Password: </label>
        <input type="text" id="password" name="password">
        <input type="submit" id="loginbtn" value="Login">
        </form>
        <button id="guestbtn">Login as Guest</button>
    </div>
    <script src="/js/login.js"></script>
</body>

</html>