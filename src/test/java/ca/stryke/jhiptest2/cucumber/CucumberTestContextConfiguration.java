package ca.stryke.jhiptest2.cucumber;

import ca.stryke.jhiptest2.JhipTest2App;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;

@CucumberContextConfiguration
@SpringBootTest(classes = JhipTest2App.class)
@WebAppConfiguration
public class CucumberTestContextConfiguration {}
