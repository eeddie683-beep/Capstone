package com.fitmap.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendRedirectController {
    private final String frontendUrl;

    public FrontendRedirectController(@Value("${fitmap.frontend-url}") String frontendUrl) {
        this.frontendUrl = frontendUrl.replaceAll("/+$", "");
    }

    @GetMapping({"/", "/login", "/signup", "/dashboard", "/exercise", "/places", "/favorites"})
    public String frontend(jakarta.servlet.http.HttpServletRequest request) {
        return "redirect:" + frontendUrl + request.getRequestURI();
    }
}
