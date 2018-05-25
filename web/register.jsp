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
<div id="register">
    <h2>Register</h2>
    <c:if test="${errors.size()>0 }">
        <div class="danger">
            <ul>
                <c:forEach var="error" items="${errors }">
                    <li>${error }</li>
                </c:forEach>
            </ul>
        </div>
    </c:if>
    <form action="Controller?action=Register" method="post">
        <label for="firstName">Name</label>
        <input type="text" id="firstName" name="firstName">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName">
        <label for="email">Email</label>
        <input type="text" id="email" name="email">
        <label for="password">Password</label>
        <input type="text" id="password" name="password">
        <label for="passRepeat">Repeat Password</label>
        <input type="text" id="passRepeat" name="passRepeat">
        <input id="submit" type="submit" value="Register">
    </form>
</div>
    <script src="/js/login.js"></script>
</body>

</html>