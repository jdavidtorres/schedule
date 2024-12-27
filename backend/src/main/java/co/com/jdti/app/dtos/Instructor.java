package co.com.jdti.app.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Instructor {

    private String name;
    private String surname;
    private Date birthday;
}
