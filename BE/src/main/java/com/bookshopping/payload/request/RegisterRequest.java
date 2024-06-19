package com.bookshopping.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(max = 100)
    private String name;

    @Min(100000)
    @Max(999999)
    private int otp;
    @NotBlank
    @Size(min = 8, max = 32)
    private String newPass;
    @NotBlank
    @Size(min = 8, max = 32)
    private String confirmPass;
}
