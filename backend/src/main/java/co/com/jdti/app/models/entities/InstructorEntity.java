package co.com.jdti.app.models.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Builder
@Entity
@Table(name = "instructors")
@NoArgsConstructor
@AllArgsConstructor
public class InstructorEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "id", unique = true, nullable = false, updatable = false)
	private String id;

	@NotEmpty
	@Column(nullable = false)
	private String name;

	@NotEmpty
	@Column(nullable = false)
	private String surname;

	@NotNull
	@Temporal(TemporalType.DATE)
	@Column(nullable = false)
	private Date birthday;

	@Builder.Default
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
	private List<EventEntity> events = new ArrayList<>();
}
